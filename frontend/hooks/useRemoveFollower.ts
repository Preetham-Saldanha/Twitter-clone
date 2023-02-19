import React from 'react'
import { axiosPrivate } from '../api_utils/axios'

export const useRemoveFollower = (  ) => {
    const executeAPI = async (follower: string, following: string) => {
        let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
        try {
            const result = await axiosPrivate.post("/api/v1/user/unfollow",{follower, following}, axiosConfig)
            console.log("look", result)
            if (result.data.message === "success") {
                return false
            }
            else return true
        } catch (err) {
            console.log(err)
            return true
        }
    }

    return executeAPI;
}
