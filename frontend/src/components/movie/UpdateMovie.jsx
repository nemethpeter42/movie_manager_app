import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../reducers/MovieReducer";
import { useLazyFindAllByIdQuery, useSaveMovieMutation } from "../../reducers/api/MoviesApi";


function UpdateMovie() {
  const { movieId } = useParams()
  const [originalTitle, setOriginalTitle] = useState("");
  const [localTitle, setLocalTitle] = useState("");
  const [prec, setPrec] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");

  const [saveMovie] = useSaveMovieMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieList = useSelector((state) => state.movies.entries);
  const [findAllById] = useLazyFindAllByIdQuery();
  
  useEffect(() => {
    (async () => {
       // Get the trigger
      

      // Then you can call with await
      const response = await findAllById({ids: [movieId]}).unwrap();
      console.log(response)
      if (response[0]){
        setOriginalTitle(response[0]?.originalTitle ?? ``)
        setLocalTitle(response[0]?.localTitle ?? ``)
        setPrec(response[0]?.prec?.toString() ?? ``)
        setYear(response[0]?.releaseInfo?.year?.toString() ?? ``)
        setRating(response[0]?.rating?.toString() ?? ``)
      }
    }) ()
  }, [])
   

  return(
    <div className="addMovie flex flex-col items-center">
      <div>
        <div className="text-lg font-bold p-2">Update Movie</div>
        <div>
          <label htmlFor="originalTitle" className="text-sm font-bold">Original title:</label>
          <input 
            type="text" 
            id="originalTitle" 
            className="
              border text-sm rounded-lg block w-100 p-2.5 m-1
              text-gray-900 bg-gray-50 border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Original title..." 
            value={originalTitle}
            onChange={(event) => {
              setOriginalTitle(event.target.value);
            }}
            />
        </div>
        <div>
          <label htmlFor="localTitle" className="text-sm font-bold">Local title:</label>
          <input 
            type="text" 
            id="localTitle" 
            className="
              border text-sm rounded-lg block w-100 p-2.5 m-1
              text-gray-900 bg-gray-50 border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Local title..." 
            value={localTitle}
            onChange={(event) => {
              setLocalTitle(event.target.value);
            }}
            />
        </div>

        <div>
          <label htmlFor="year" className="text-sm font-bold">Release year:</label>
          <input 
            type="text" 
            id="year" 
            className="
              border text-sm rounded-lg block w-100 p-2.5 m-1
              text-gray-900 bg-gray-50 border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Release year..." 
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
            }}
            />
        </div>

        <div>
        <label htmlFor="prec" className="text-sm font-bold">Precedence (0-3):</label>
          <input 
            type="text" 
            id="prec" 
            className="
              border text-sm rounded-lg block w-100 p-2.5 m-1
              text-gray-900 bg-gray-50 border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Precedence (0-3)..." 
            value={prec}
            onChange={(event) => {
              setPrec(event.target.value);
            }}
            />
        </div>

        <div>
          <label htmlFor="rating" className="text-sm font-bold">Rating (0-10):</label>
          <input 
            type="text" 
            id="rating" 
            className="
              border text-sm rounded-lg block w-100 p-2.5 m-1
              text-gray-900 bg-gray-50 border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Rating (0-10)..." 
            value={rating}
            onChange={(event) => {
              setRating(event.target.value);
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
          onClick={async () => {
            await saveMovie({
              movieId,
              originalTitle,
              localTitle,
              releaseInfo: {year: Number(year),},
              rating: Number(rating),
              prec,
            }).unwrap()
            console.log('hopp')
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