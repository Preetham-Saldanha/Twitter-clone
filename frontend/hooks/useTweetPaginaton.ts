import React, { useEffect, useState } from 'react'
import axios from '../api_utils/axios'
import { Tweet } from '../typings'


type Data = {
    tweets: Tweet[],
    count: number
}
function useTweetPaginaton({ pageNumber , refreshFlag}: { pageNumber: number , refreshFlag: boolean}) {
    const [newTweets, setNewTweets] = useState<Tweet[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState(true)

    const bringTweets = async () => {
        try {
            console.log("pageNumber", pageNumber)
            const data: Data = (await axios.get(`/api/v1/tweet/${pageNumber}`)).data
            const tweets: Tweet[] = data.tweets;
            console.log(data.count, "count")

            setHasMore(data.count !== (newTweets.length + tweets.length))
            if (pageNumber === -1) {
                setNewTweets([...tweets])
            }
            else {
                const temp = [...newTweets]
                for (let tweet of tweets) {
                    temp.push(tweet)
                }
                // const uniques= new Set([...newTweets, ...tweets])
                setNewTweets([...temp])
            }
        } catch (err) {
            console.log(err);
            setError(true)
        }

    }

    useEffect(() => {
        setLoading(true);
        setError(false)
        bringTweets()
        setLoading(false)
    }, [pageNumber, refreshFlag])

    return { loading, error, hasMore, newTweets };

}

export default useTweetPaginaton