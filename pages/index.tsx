import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "@/components/axios"
import { useDebounce } from "react-use"
import { MdKeyboardArrowRight } from "react-icons/md"
import SearchItem from "@/components/SearchItem"

// create type for genres state
type Genre = {
  name: string
  id: number
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/"

export default function Home() {
  const [searchMovies, setSearchMovies] = useState<MovieSearch[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [genreModal, setGenreModal] = useState<boolean>(false)
  const [searchModal, setSearchModal] = useState<boolean>(false)

  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    axios
      .get("/movies/genres")
      .then(({ data }) => {
        setGenres(data.genres)
      })
      .catch((err) => {})
  }, [])

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])

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

  return (
    <div className="wrapper py-10 ">
      <div className="flex items-center justify-between">
        <div className="max-w-[25rem] w-full relative">
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

        <div>
          <div className="relative overflow-visible">
            <div
              onClick={toggleGenreModal}
              className="flex items-center cursor-pointer z-[0]"
            >
              <span className="select-none">Genres</span>
              <MdKeyboardArrowRight className="text-xl" />
            </div>

            <div
              className={`${
                genreModal ? "genreModalOpen" : "genreModalClosed"
              } bg-[#272727] p-4 absolute top-10 left-0 grid grid-cols-2 gap-2 min-w-[20rem]`}
            >
              {genres.map((genre) => {
                return (
                  <div
                    key={genre.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      className="w-3 h-3"
                      id={`${genre.id}`}
                      checked={isCheckboxChecked(genre.id)}
                      onChange={() => {
                        handleGenreChange(genre.id)
                      }}
                      type="checkbox"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor={`${genre.id}`}
                    >
                      {genre.name}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
