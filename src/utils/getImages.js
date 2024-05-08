import axios from "axios"
import { API_KEY, API_URL } from "./constants"

const getImages = (query) => {
    try {
        const response = axios.get(`${API_URL}/?key=${API_KEY}&q=${query}&image_type=photo`)
        return response
    }
    catch (err) {
        console.log(err)
    }
}
export default getImages