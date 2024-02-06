import moment from "moment"
import Link from "next/link"

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/"

type SearchItemType = React.FC<{ movieItem: MovieSearch }>

const SearchItem: SearchItemType = ({ movieItem }) => {
  return (
    <Link
      href={`/movies/${movieItem.id}`}
      className="flex gap-5 group hover:bg-[#3a3a3a] px-4 py-3"
    >
      <img
        src={`${BASE_IMAGE_URL}w500${movieItem.poster_path}`}
        alt=""
        className="min-w-[8rem] h-[12rem] object-cover rounded-md"
      />

      <div className="w-fit h-fit">
        <h3 className="text-[#427BC0] text-xl font-semibold">
          {movieItem.title}
        </h3>
        <p className="text-[#B3B3B3]">
          {moment(movieItem?.release_date).format("YYYY")}
        </p>
      </div>
    </Link>
  )
}

export default SearchItem
