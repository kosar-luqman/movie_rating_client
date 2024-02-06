import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "@/components/axios"
import { useDebounce } from "react-use"
import { MdKeyboardArrowRight } from "react-icons/md"
import SearchItem from "@/components/SearchItem"
import QueryString from "qs"
import moment from "moment"
import DropdownNumbers from "@/components/DropdownNumbers"
import MovieItem from "@/components/MovieItem"
import GenresModal from "@/components/GenresModal"

// create type for genres state

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/"

export default function Home() {
  const [movies, setMovies] = useState<MoviesState>({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  })

  const [searchMovies, setSearchMovies] = useState<MovieSearch[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  const [genreModal, setGenreModal] = useState<boolean>(false)
  const [genres, setGenres] = useState<Genre[]>([])

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedRating, setSelectedRating] = useState<string>("")
  const [selectedSort, setSelectedSort] = useState<string>("")

  const [searchModal, setSearchModal] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get("/movies/genres")
      .then(({ data }) => {
        setGenres(data.genres)
      })
      .catch((err) => {})
  }, [])

  const getMovies = (page?: number) => {
    const genresData =
      genres?.length > 0
        ? selectedGenres?.map((genre) => `${genre.id}`).toString()
        : ""
    const query = QueryString.stringify({
      page: !page ? page : movies?.page,
      genre: genresData,
      year: selectedYear ? selectedYear : "",
      rating: selectedRating ? selectedRating : "",
      sortBy: selectedSort ? selectedSort : "",
    })

    axios
      .get(`/movies?${query}`)
      .then(({ data }) => {
        setMovies(data)
      })
      .catch((err) => {})
  }

  useEffect(() => {
    getMovies()
  }, [selectedGenres, selectedYear, selectedRating, selectedSort])

  const handleGenreChange = (id: number) => {
    const genre = genres.find((genre) => genre.id === id)

    // check if genre is already in selectedGenres
    const isGenreSelected = selectedGenres.find((genre) => genre.id === id)

    // if genre is already in selectedGenres, remove it
    if (isGenreSelected) {
      const updatedGenres = selectedGenres.filter((genre) => genre.id !== id)
      setSelectedGenres(updatedGenres)
      return
    }

    if (genre) {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const isCheckboxChecked = (id: number) => {
    const isSelected = selectedGenres.find((genre) => genre.id === id)

    if (isSelected) {
      return true
    }

    return false
  }

  const handleSearch = () => {
    axios
      .get(`/movies/search?title=${searchQuery}`)
      .then(({ data }) => {
        setSearchModal(true)
        setSearchMovies(data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [, cancel] = useDebounce(
    () => {
      if (searchQuery === "") {
        setSearchMovies([])
        setSearchModal(false)
        return
      }

      handleSearch()
    },
    1000,
    [searchQuery]
  )

  const toggleGenreModal = () => {
    setGenreModal(!genreModal)
  }

  const filterMoviesByYear = (val: any) => {
    setSelectedYear(val)
  }

  const filterMoviesRating = (val: any) => {
    setSelectedRating(val)
  }

  const sortMoviesBy = (val: any) => {
    setSelectedSort(val)
  }

  const handleClickPrev = () => {
    if (movies?.page === 1) return

    getMovies(movies?.page - 1)
  }

  const handleClickNext = () => {
    if (movies?.page === movies?.total_pages) return

    getMovies(movies?.page + 1)
  }

  return (
    <div className="p-0 py-10 wrapper">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        {/* Search Start */}
        <div className="max-w-[20rem] w-full relative">
          {/* Search Backdrop */}
          {searchModal && searchMovies?.length > 0 && (
            <div
              className="bg-[rgba(0,0,0,0.5)] fixed left-0 top-0 w-full h-full z-[2]"
              onClick={() => setSearchModal(false)}
            />
          )}

          <input
            type="text"
            placeholder="Search for movies"
            className="bg-[#1D1D1D] border-[1px] border-[#7e7e7e] rounded-sm w-full p-2 outline-none flex z-[2] relative"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setSearchModal(true)}
          />

          {/* Results */}
          {searchModal && (
            <div className="bg-[#272727] absolute top-[2.9rem] left-0 w-full flex flex-col  gap-6 max-h-[38rem] z-[2] overflow-y-auto">
              {searchMovies.map((movieItem) => {
                if (
                  !movieItem.poster_path ||
                  !movieItem.title ||
                  !movieItem.release_date
                )
                  return

                return <SearchItem key={movieItem.id} movieItem={movieItem} />
              })}
            </div>
          )}
        </div>
        {/* Search End */}

        <div className="flex flex-wrap items-center gap-5">
          {/* Sort By Start */}
          <select
            onChange={(e) => sortMoviesBy(e.target.value)}
            className="bg-[#272727] py-1.5 px-3"
          >
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="primary_release_date">Release Date</option>
            <option value="vote_average">Rating</option>
          </select>
          {/* Sort By End */}

          {/* Rating Start */}
          <DropdownNumbers
            id="rating"
            min={1}
            max={10}
            onSelect={filterMoviesRating}
          />
          {/* Rating End */}

          {/* Years Start */}
          <DropdownNumbers
            id="year"
            min={1900}
            max={new Date().getFullYear()}
            onSelect={filterMoviesByYear}
          />
          {/* Years End */}

          {/* Genres Start */}
          <div className="relative overflow-visible">
            <div
              onClick={toggleGenreModal}
              className="flex items-center cursor-pointer z-[0]"
            >
              <span className="select-none">Genres</span>
              <MdKeyboardArrowRight className="text-xl" />
            </div>

            <GenresModal
              show={genreModal}
              genres={genres}
              handleGenreChange={handleGenreChange}
              isCheckboxChecked={isCheckboxChecked}
            />
          </div>
          {/* Genres End */}
        </div>
      </div>

      {/* Render Movies Start */}
      <div className="grid w-full grid-cols-1 gap-6 mt-10 xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies?.results?.map((movie) => {
          if (!movie.poster_path || !movie.title || !movie.release_date) return

          return <MovieItem key={movie?.id} movie={movie} />
        })}
      </div>
      {/* Render Movies End */}

      {/* Buttons */}
      {movies?.results?.length > 1 && (
        <div className="flex items-center justify-center gap-5 my-10">
          <button
            onClick={handleClickPrev}
            className={`px-5 py-2 text-[1rem] uppercase font-medium rounded-sm ${
              movies?.page === 1 ? "bg-[#B3B3B3] text-[black]" : "bg-primary"
            } `}
          >
            Prev
          </button>
          <button
            onClick={handleClickNext}
            className={`px-5 py-2 text-[1rem] uppercase font-medium rounded-sm bg-primary ${
              movies?.page === movies?.total_pages
                ? "bg-[#B3B3B3] text-[black]"
                : "bg-primary"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
