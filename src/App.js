import { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate, } from "react-router-dom"
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
import services from "./services/movieService";
import * as userService from "./services/userService";
import { Context } from "./context/useContext";

const baseUrl = "http://localhost:3030/data/movies"

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [formError, setFormError] = useState("");
  const [user, setUser] = useState('');

  const navigate = useNavigate();
  useContext(Context);
  useEffect(() => {
    services.get(baseUrl)
      .then(response => Object.values(response))
      .then(rezult => setMovies(rezult))
      .catch((err) => console.log(err));
  }, []);


  const onDetailsClick = (movieId) => {
    services.get(`${baseUrl}/${movieId}`)
      .then(response => setMovie(response))
      .catch(err => console.log(err));
  }

  const onCreateSubmit = async (e, data) => {
    e.preventDefault();
    console.log(data);
    try {
      await services.post(baseUrl, data, user.accessToken);
    } catch (error) {
      console.log(error)
    }
    setMovies((oldMovies) => [...oldMovies, data]);
    navigate("/movies");
  }

  const onDeleteClick = async (id) => {
    try {
      await services.delete(`${baseUrl}/${id}`, user.accessToken);
    } catch (error) {
      console.log(error);
    }
    setMovies(oldMovies => oldMovies.filter(x => x._id !== id));
    navigate("/movies");
  }

  const onEditSubmit = async (e, movieId, data) => {
    e.preventDefault();
    try {
      await services.put(`${baseUrl}/${movieId}`, data, user.accessToken);
    } catch (error) {
      console.log(error)
    }
    setMovies(oldMovies => oldMovies.map(x => x._id === movieId ? x = data : x));
    navigate("/movies");
  }

  

  const onRegister = async (e, userForm) => {
    e.preventDefault();
    const { repeatPassword, ...userInfo } = userForm
    setFormError("");
    if (userForm.password !== userForm.repeatPassword) {
      setFormError("Passwords must match!");
      return
    }
    if (userForm.password.length < 3 || userForm.password.length > 10) {
      setFormError("Password must be atleast 3 characters long!")
      return
    }
    if (!userForm.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      setFormError("Invalid email!");
      return
    }
    try {
      const response = await userService.register(userInfo);
      navigate("/login");
      
    } catch (error) {
      setFormError(error.message)
    }
  }

  const onLogin = async (e, userForm) => {
    e.preventDefault();
    setFormError("");

    try {
      const response = await userService.login(userForm)
      setUser(response);
      navigate("/");

    } catch (error) {
      setFormError(error.message)
    }
  }

  const onLogout = async () => {
    try {
      await userService.logout(user.accessToken);
    } catch (error) {
      console.log(error);
    }
    setUser("");
    navigate("/");
  }
  const appContext = {
    token: user.accessToken,
    email: user.email,
    userId: user._id,
    onDetailsClick,
    movie,
    formError

  }
  
  return (
    <>
      <Context.Provider value={appContext}>
        <Navigation user={user} onLogout={onLogout} />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies" element={<MovieList movies={movies} />}></Route>
          <Route path="/register" element={<Register onRegister={onRegister} />}></Route>
          <Route path="/login" element={<Login onLogin={onLogin} />}></Route>
          <Route path="/add-movie" element={<AddMovie onCreateSubmit={onCreateSubmit} />}></Route>
          <Route path="/movies/:movieId" element={<Details
            onDeleteClick={onDeleteClick}
          />}></Route>
          <Route path="/movies/:movieId/edit" element={<Edit onEditSubmit={onEditSubmit} />}></Route>
        </Routes>
      </Context.Provider>

      <Footer />
    </>
  );
}

export default App;
