
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie } from "../../reducers/MovieReducer";
import { useNavigate } from "react-router-dom";



function CreateMovie() {
  const [originalTitle, setOriginalTitle] = useState("");
  const [localTitle, setLocalTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieList = useSelector((state) => state.movies.entries);

  return(
    <div className="addMovie">
      <div className="text-lg font-bold p-2">Add movie</div>
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
        navigate(`/`)
      }}
    >
      Add Movie
    </button>
  </div>
  )
}

export default CreateMovie