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
        <div>
          <input 
            type="text" 
            id="originalTitle" 
            className="
              border text-sm rounded-lg block w-full p-2.5 m-1
              text-gray-900 bg-gray-50 border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Original title..." 
            onChange={(event) => {
              setOriginalTitle(event.target.value);
            }}
            />
        </div>
        <div>
          <input 
            type="text" 
            id="localTitle" 
            className="
              border text-sm rounded-lg block w-full p-2.5 m-1
              text-gray-900 bg-gray-50 border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Local title..." 
            onChange={(event) => {
              setLocalTitle(event.target.value);
            }}
            />
        </div>
        <button
        className="
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
          text-white bg-blue-700 
          hover:bg-blue-800 
          focus:ring-4 focus:ring-blue-300 focus:outline-none
          dark:bg-blue-600 dark:hover:bg-blue-700 
          dark:focus:ring-blue-800"
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
        {movieList.map((movie,i) => {
          return (
            <div key={i}>
              <h1 className="underline text-gray-500"> {movie.originalTitle}</h1>
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