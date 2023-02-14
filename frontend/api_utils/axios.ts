import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default axios.create({
    baseURL: BASE_URL,
    withCredentials:true
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    // headers: { 'Content-Type': 'application/json;charset=UTF-8'},
    withCredentials: true
})