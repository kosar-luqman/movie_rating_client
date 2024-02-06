import React, { useEffect, useState } from "react"
import axios from "@/components/axios"
import ReviewModal from "@/components/ReviewModal"
import moment from "moment"

type MovieType = React.FC<{ movieId: string }>

const Movie: MovieType = ({ movieId }) => {
  const [movie, setMovie] = useState<MovieDetail>({} as MovieDetail)
  const [reviewModal, setReviewModal] = useState<boolean>(false)
  const [reviewForm, setReviewForm] = useState({
    username: "",
    comment: "",
    rating: 0,
  })

  useEffect(() => {
    axios
      .get(`/movies/${movieId}`)
      .then(({ data }) => {
        setMovie(data)
      })
      .catch((err) => {})
  }, [movieId])

  const handleToggleModal = () => {
    setReviewModal(!reviewModal)
  }

  const handleChangeReviewForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.name) return

    if (e.target.name === "rating") {
      // Allow only numbers
      const value = e.target.value

      if (parseInt(value) >= 0 && parseInt(value) <= 10) {
      } else return
    }

    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
  }

  const handleSubmitReviewForm = () => {
    if (!reviewForm.username || !reviewForm.comment || !reviewForm.rating)
      return

    if (!movieId) return
  }

  if (!movieId || !movie) return <div>Loading...</div>

  return (
    <div className="wrapper py-6">
      <ReviewModal
        isOpen={reviewModal}
        reviewForm={reviewForm}
        handleChangeReviewForm={handleChangeReviewForm}
        handleSubmitReviewForm={handleSubmitReviewForm}
        handleToggleModal={handleToggleModal}
      />

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt=""
        className="w-full h-[20rem] xsm:h-[30rem] sm:h-[40rem] object-cover rounded-md"
      />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-5">
        <h1 className="text-3xl font-semibold text-primary">{movie.title}</h1>
        <p className="text-[#B3B3B3]">{movie.release_date}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 mt-5">
        <div className="sm:w-1/2">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-[#B3B3B3] mt-1">{movie.overview}</p>
        </div>

        <div className="w-1/2">
          <h2 className="text-xl font-semibold">Genres</h2>
          <div className="flex gap-5 mt-1">
            {movie.genres?.map((genre) => (
              <p key={genre.id} className="text-[#B3B3B3]">
                {genre.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Reviews</h2>

          <button
            onClick={handleToggleModal}
            className="bg-primary py-3 px-4 rounded-md"
          >
            Add a Review
          </button>
        </div>

        {/* Reviews */}
        <div className="flex flex-col gap-5 mt-5">
          {movie.reviews?.map((review) => {
            return (
              <div
                key={review._id}
                className="flex justify-between items-center bg-[#272727] p-5 rounded-md"
              >
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    {review.username}
                  </h3>
                  <p className="text-[#B3B3B3]">{review.comment}</p>
                </div>

                <p className="text-[#B3B3B3]">
                  {moment(review?.createdAt).format("MMM Do YYYY")}
                </p>
              </div>
            )
          })}
        </div>

        {/* No Reviews */}
        {movie.reviews?.length === 0 && (
          <div className="text-[#B3B3B3] mt-5">No reviews yet</div>
        )}
      </div>
    </div>
  )
}

export default Movie

export async function getServerSideProps(context: any) {
  const movieId = context.query.movieId || ""

  return {
    props: {
      movieId,
    },
  }
}
