import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../reducers/MovieReducer";


function UpdateMovie() {
  const { movieId } = useParams()
  const [originalTitle, setOriginalTitle] = useState("");
  const [localTitle, setLocalTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieList = useSelector((state) => state.movies.entries);

  return(
    <div className="addMovie flex flex-col items-center">
      <div>
        <div className="text-lg font-bold p-2">Update Movie</div>
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
          font-medium rounded-lg text-sm px-5 py-2.5 m-2 
          text-white bg-blue-700 
          hover:bg-blue-800 
          focus:ring-4 focus:ring-blue-300 focus:outline-none
          dark:bg-blue-600 dark:hover:bg-blue-700 
          dark:focus:ring-blue-800"
          onClick={() => {
            dispatch(
              updateMovie({
                movieId,
                originalTitle,
                localTitle,
              })
            );
            navigate(`/`)
          }}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default UpdateMovie