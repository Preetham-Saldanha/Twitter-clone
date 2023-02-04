import axios from '../../api_utils/axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tweet } from '../../typings'

type Data = {
  tweets: Tweet[]
}
 const url = process.env.BACKEND_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
const data : Data =  (await axios.get(`/api/v1/tweet`)).data
console.log("get api",data)
  res.status(200).json(data)
}