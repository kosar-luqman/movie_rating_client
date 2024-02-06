interface MovieSearch {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type Genre = {
  name: string
  id: number
}

type MoviesState = {
  page: number
  results: MovieSearch[]
  total_pages: number
  total_results: number
}

interface Review {
  _id: string
  username: string
  rating: number
  comment: string
  movieId: string
  createdAt: string
  updatedAt: string
}

interface MovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  reviews: Review[]
}
