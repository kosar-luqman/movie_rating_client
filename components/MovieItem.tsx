import moment from "moment"
import Link from "next/link"

type MovieItemType = React.FC<{
  movie: MovieSearch
}>

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/"

const MovieItem: MovieItemType = ({ movie }) => {
  return (
    <Link href={`/movies/${movie?.id}`} className="group">
      <img
        className="w-full h-[20rem] object-cover rounded-md"
        src={`${BASE_IMAGE_URL}w500${movie.poster_path}`}
        alt=""
      />

      <h3 className="mt-2 text-xl font-semibold truncate transition-all group-hover:text-primary">
        {movie?.title}
      </h3>
      <p className="text-[#B3B3B3]">
        {moment(movie?.release_date).format("YYYY")}
      </p>
    </Link>
  )
}

export default MovieItem
