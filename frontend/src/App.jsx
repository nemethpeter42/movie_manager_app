import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, deleteMovie, updateMovie } from "./reducers/MovieReducer";
import { ChatBubbleLeftIcon, StarIcon, PlusIcon } from "@heroicons/react/24/solid"
import {Route, Routes, useNavigate} from "react-router-dom"
import CreateMovie from "./components/movie/CreateMovie";
import ListOfMovies from "./components/movie/ListOfMovies";
import UpdateMovie from "./components/movie/UpdateMovie";
import NotFound from "./components/NotFound";

function App() {

  const navigate = useNavigate();

  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<ListOfMovies />}/>
        <Route path="/create" element={<CreateMovie />}/>
        <Route path="/update/:id" element={<UpdateMovie />}/>
        <Route path="*" element={<NotFound />}/>

      </Routes>
     
    </div>
  );
}

export default App;