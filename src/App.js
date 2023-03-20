import { useEffect, useState, } from "react";
import { Routes, Route, useNavigate,} from "react-router-dom"
import './App.css';
import { AddMovie } from "./components/AddMovie/AddMovie";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from "./components/Login/Login";
import { MovieList } from "./components/MovieList/MovieList";
import { Navigation } from './components/Navigation/Navigation';
import { Register } from "./components/Register/Register";
import  services from "./services/movieService";

const baseUrl = "http://localhost:3030/jsonstore/movies"

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [formError, setFormError] = useState("");
  const [user , setUser] = useState('');

  
  
  const navigate = useNavigate();
  useEffect(() => {
    services.get(baseUrl)
    .then(response=> Object.values(response))
    .then(rezult => setMovies(rezult))
    .catch((err)=> console.log(err));
  }, []);

  

  const onDetailsClick = (movieId) =>{
    services.get(`${baseUrl}/${movieId}`)
    .then(response => setMovie(response))
    .catch(err => console.log(err));
  }

  const onCreateSubmit = async (e, data) =>{
    e.preventDefault();
    console.log(data);
    try {
      await services.post(baseUrl,data);
    } catch (error) {
      console.log(error)
    }
    setMovies((oldMovies) => [...oldMovies, data]);
    navigate("/movies");
  }

  const onDeleteClick = async (id) =>{
    try {
      await services.delete(`${baseUrl}/${id}`);
    } catch (error) {
      console.log(error);
    }
    setMovies(oldMovies=> oldMovies.filter(x => x._id !== id ));
    navigate("/movies");
  }

  const onEditSubmit = async (e, movieId, data) =>{
    e.preventDefault();
    try {
      await services.put(`${baseUrl}/${movieId}`, data );
    } catch (error) {
      console.log(error)
    }
    setMovies(oldMovies => oldMovies.map(x => x._id === movieId ? x = data : x));
    navigate("/movies");
  }

  const onCommentSubmit = async (e, comment, movieId) =>{
      e.preventDefault();
      await services.post(`${baseUrl}/${movieId}/comments`, comment);
      onDetailsClick(movieId);
      navigate(`/movies/${movieId}`);
  }

  const onRegister = async (e, userForm) =>{
    e.preventDefault();
    setFormError("");
    if(userForm.password !== userForm.repeatPassword){
      setFormError("Passwords must match!");
      return
    }
    if(userForm.password.length < 3 || userForm.password.length > 10 ){
      setFormError("Password must be atleast 3 characters long!")
      return
    }
    if(!userForm.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      setFormError("Invalid email!");
      return
    }
    try {
      const response = await fetch("http://localhost:3030/users/register",{
        method: "POST",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(userForm)
      })
      if(response.ok || response.status === 204){
        const rezult = await response.json();
        localStorage.setItem("user", JSON.stringify(rezult));
        setUser(localStorage.getItem(rezult));
        navigate("/");
      }else{
        const rezult = await response.json();
        setFormError(rezult.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const  onLogout = async () =>{
    console.log(user.accessToken)
    try {
      await fetch("http://localhost:3030/users/logout",{
        method:"GET",
        headers:{
          // "X-Authorization": {user.accessToken}
        }
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.clear();
    setUser("");
    navigate("/");
  }
 
  return (
    <>
      <Navigation user={user} onLogout={onLogout}/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movies" element={<MovieList movies={movies} onDetailsClick={onDetailsClick} />}></Route>
        <Route path="/register" element={<Register onRegister={onRegister} formError={formError} />}></Route>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path="/add-movie" element={<AddMovie onCreateSubmit={onCreateSubmit}/>}></Route>
        <Route path="/movies/:movieId" element={<Details 
        movie={movie} 
        onDeleteClick={onDeleteClick} 
        onDetailsClick={onDetailsClick} 
        onCommentSubmit={onCommentSubmit}
         />}></Route>
        <Route path="/movies/:movieId/edit"  element={<Edit movie={movie} onEditSubmit={onEditSubmit}/>}></Route>
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
