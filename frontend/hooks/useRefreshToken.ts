import React, { useContext } from 'react'
import axios from '../api_utils/axios'
// import useAuth from '../contexts/AuthContext'
import useAuth from './useAuth'

const useRefreshToken = () => {
    console.log("this is executing...")
    
    const { auth, setAuth } :any= useAuth()

    const refresh = async () => {
        const response = await axios.get('/api/v1/refresh', {
            withCredentials: true
        })
        setAuth(prev => {
            console.log(prev.accessToken)
            return { ...prev, accessToken: response.data.accessToken }
        })
        return response.data.accessToken

    }

    return refresh
}

export default useRefreshToken