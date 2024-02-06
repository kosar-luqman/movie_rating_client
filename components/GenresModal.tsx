type GenresModalType = React.FC<{
  show: boolean
  genres: Genre[]
  isCheckboxChecked: (id: number) => boolean
  handleGenreChange: (id: number) => void
}>

const GenresModal: GenresModalType = ({
  show,
  genres,
  isCheckboxChecked,
  handleGenreChange,
}) => {
  return (
    <div
      className={`${
        show ? "genreModalOpen" : "genreModalClosed"
      } bg-[#272727] p-4 absolute top-10 right-0 grid grid-cols-2 gap-2 min-w-[20rem]`}
    >
      {genres.map((genre) => {
        return (
          <div
            key={genre.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              id={`${genre.id}`}
              className="w-3 h-3"
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
  )
}

export default GenresModal
