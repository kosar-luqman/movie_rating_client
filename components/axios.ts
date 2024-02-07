import axios from "axios"

const instance = axios.create({
  // Local
  // baseURL: "http://localhost:5006",

  // Production
  baseURL: "https://api.shadkamil.dev/",
})

export default instance
