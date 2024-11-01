import axios from "axios"

const api = axios.create({
    baseURL: "https://localhost:500/api" //altere para o endereço da sua api
})

export default api