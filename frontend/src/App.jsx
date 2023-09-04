import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, deleteMovie, updateMovie } from "./reducers/Movie.reducer";

function App() {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movies.entries);

  const [originalTitle, setOriginalTitle] = useState("");
  const [localTitle, setLocalTitle] = useState("");
  const [newOriginalTitle, setNewOriginalTitle] = useState("");

  return (
    <div className="App">
      {" "}
      <div className="addMovie">
        <input
          type="text"
          placeholder="Original title..."
          onChange={(event) => {
            setOriginalTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Local title..."
          onChange={(event) => {
            setLocalTitle(event.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch(
              addMovie({
                id: movieList[movieList.length - 1].id + 1,
                originalTitle,
                localTitle,
              })
            );
          }}
        >
          {" "}
          Add Movie
        </button>
      </div>
      <div className="displayMovies">
        {movieList.map((movie) => {
          return (
            <div>
              <h1> {movie.originalTitle}</h1>
              <h1> {movie.localTitle}</h1>
              <input
                type="text"
                placeholder="New Original title..."
                onChange={(event) => {
                  setNewOriginalTitle(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  dispatch(
                    updateMovie({ id: movie.id, originalTitle: newOriginalTitle })
                  );
                }}
              >
                {" "}
                Update Movie
              </button>
              <button
                onClick={() => {
                  dispatch(deleteMovie({ id: movie.id }));
                }}
              >
                Delete Movie
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;