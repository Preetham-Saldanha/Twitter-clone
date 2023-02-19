import React from 'react'
import { axiosPrivate } from '../api_utils/axios'

const useAddFollower = () => {

    const executeAPI = async (follower:string, following:string) => {
        let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
        try {
            const result = await axiosPrivate.post("/api/v1/user/follow",{follower, following}, axiosConfig)
            console.log("look", result)
            if (result.data.message === "success") {
                return true
            }
            else return false
        } catch (err) {
            console.log(err)
            
        }
        return false
    }

    return executeAPI;

}

export default useAddFollower