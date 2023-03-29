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
import { Error } from "./components/ErrorPage/Error";
import { Wheather } from "./components/Wheather/Wheather";


import services from "./services/movieService";
import { createFormVlaidator, registerFormValidator, editFormVlaidator } from "./utils/formValidator";
import * as userService from "./services/userService";
import { Context } from "./context/useContext";
import { useLocalStorage } from "./hooks/useLocalStorage";


const baseUrl = "http://localhost:3030/data/movies"

function App() {
  const [movies, setMovies] = useState([]);
  const [formError, setFormError] = useState("");
  const [user, setUser] = useLocalStorage("auth", "");
  const navigate = useNavigate();
  useContext(Context);

  useEffect(() => {
    services.get(baseUrl)
      .then(response => Object.values(response))
      .then(rezult => setMovies(rezult))
      .catch(err => {
        console.log(err.message)
      });
  }, [navigate]);

  const onCreateSubmit = async (e, data) => {
    e.preventDefault();
    setFormError("");

    const rezult = createFormVlaidator(data);

    if (typeof rezult === "string") {
      return setFormError(rezult);
    }

    try {
      const response = await services.post(baseUrl, data, user.accessToken);
      setMovies((oldMovies) => [...oldMovies, response]);
      setFormError("");
      navigate("/movies");
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const onDeleteClick = async (id) => {
    try {
      await services.delete(`${baseUrl}/${id}`, null, user.accessToken);
    } catch (error) {
      console.log(error.message);
      
    }
    setMovies(oldMovies => oldMovies.filter(x => x._id !== id));
    navigate("/movies");
  }

  const onEditSubmit = async (e, movieId, data) => {
    e.preventDefault();
    setFormError("");

    const rezult = editFormVlaidator(data);
   
    if (typeof rezult === "string") {
      return setFormError(rezult);
    }

    try {
      const response = await services.put(`${baseUrl}/${movieId}`, data, user.accessToken);
      setMovies(oldMovies => oldMovies.map(x => x._id === movieId ? x = response : x));
      setFormError("")
      navigate(`/movies/${movieId}`);
    } catch (error) {
      console.log(error.message);
      setFormError(error.message);
    }
  }



  const onRegister = async (e, userForm) => {
    e.preventDefault();

    setFormError("");

    const rezult = registerFormValidator(userForm);

    if (typeof rezult === "string") {
      return setFormError(rezult);
    }

    const { repeatPassword, ...userInfo } = userForm

    try {
      await userService.register(userInfo);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setFormError(error.message);
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
      console.log(error.message);
      setFormError(error.message);
    }
  }

  const onLogout = async () => {
    try {
      await userService.logout(user.accessToken);
      setUser("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  const appContext = {
    token: user.accessToken,
    email: user.email,
    userId: user._id,
    formError,
  };

  const isUser = user ? true : false;

  return (
    <>
      <Context.Provider value={appContext}>
        <Navigation user={user} onLogout={onLogout}/>
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies" element={<MovieList movies={movies}/>}></Route>
          <Route path="/register" element={!isUser ? <Register onRegister={onRegister} /> : <Error/>}></Route>
          <Route path="/login" element={!isUser ? <Login onLogin={onLogin} /> : <Error/>}></Route>
          <Route path="/add-movie" element={isUser ? <AddMovie onCreateSubmit={onCreateSubmit} /> : <Error />}></Route>
          <Route path="/movies/:movieId" element={<Details onDeleteClick={onDeleteClick} />}></Route>
          <Route path="/movies/:movieId/edit" element={isUser ? <Edit onEditSubmit={onEditSubmit} /> : <Error />}></Route>
          <Route path="/404" element={<Error />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Context.Provider>

      <Footer />
    </>
  );
}

export default App;
