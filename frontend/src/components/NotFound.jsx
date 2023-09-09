import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate()
  return(
    <div>
      <div className="m-2">The page you're looking doesn't seem to exist.</div>
      <button className="
        font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
        text-white bg-blue-700 
        hover:bg-blue-800 
        focus:ring-4 focus:ring-blue-300 focus:outline-none
        dark:bg-blue-600 dark:hover:bg-blue-700 
        dark:focus:ring-blue-800"
        onClick={() => {
          navigate(`/`)
        }}
      >
        Back to Home
      </button>
    </div>
  )
}
export default NotFound