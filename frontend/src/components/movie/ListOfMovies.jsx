
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, deleteMovie, updateMovie } from "../../reducers/MovieReducer";
import { ChatBubbleLeftIcon, StarIcon, PlusIcon } from "@heroicons/react/24/solid"
import {useNavigate} from "react-router-dom"
import CreateMovie from "./CreateMovie";

function ListOfMovies() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const movieList = useSelector((state) => state.movies.entries);

  const [newOriginalTitle, setNewOriginalTitle] = useState("");

  const getPrecedence = (num) => {
    const precedences = {
      0: `already watched`,
      1: `watch next time`,
      2: `watch later`,
      3: `don't watch`,
    }
    return precedences[num] ?? `unknown value`
  }

  return (
    <div>
      <div className="shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                  Original Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Local Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Precedence
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
            </tr>
        </thead>
        <tbody>
          {movieList.map((movie,i) => {
            return (
              <tr 
                key={i}
                className={`
                  ${true ? `border-b border-gray-200`: ``}
                  ${true ? `dark:border-gray-700`: ``}
                `}
                >
                <td className="px-6 py-4">
                  {movie.originalTitle}
                </td>
                <td className="px-6 py-4">
                  {movie.localTitle}
                </td>
                <td className="px-6 py-4">
                  {movie.releaseInfo?.year}
                </td>
                <td className="px-6 py-4">
                  {getPrecedence(Number(movie.prec))}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span>{movie.rating}</span>
                    {movie.rating!==undefined ? <StarIcon className="h-4 w-4 ml-0.5" /> : null}
                  </div>
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center">
                    <span>{movie.comments?.length ? movie.comments?.length : null}</span>
                    {movie.comments?.length ? <ChatBubbleLeftIcon className="h-4 w-4 ml-0.5" /> : null}
                  </div>
                </td>
                <td>
                  <div className="flex flex-row">
                    <div 
                      className="text-yellow-500 cursor-pointer m-1"
                      onClick={() => {
                        navigate(`/update/${movie.id}`);
                      }}
                      >
                      Edit
                    </div>
                    <div 
                      className="text-red-500 cursor-pointer m-1"
                      onClick={() => {
                        //console.log(`DEBUG ${movie.id}`)
                        dispatch(
                          deleteMovie({
                            id:movie.id,
                          })
                        );
                      }}
                      >
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ) 
          })}
          </tbody>
        </table>
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
            navigate(`create`)
          }}
        >
        <div className="flex items-center">
          <PlusIcon className="h-4 w-4 m-1" />
          <span>Add Movie</span>
        </div>
        
      </button>
    </div>
  )
}

export default ListOfMovies;