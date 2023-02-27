export interface Tweet extends TweetBody{
    tweet_id:number
    created_at:string
    updated_at?:string
    rev?:string
    type?:'tweet'
    blockTweet?:boolean
}

export type TweetBody= {
tweet_text: string
username:string
profile_image_path?:string
tweet_image_path?:string
retweet_count:number
favorite_count:number
firstname:string
lastname:string
reply_to:string
}

export type UserAuth= {
    username: string,
    email: string,
    profile_image_path: string,
    id: number,
    accessToken : string,
    firstname: string,
    lastname:string,
  
}

export type profileDataType = {
    username: string;
    email: string;
    profile_image_path:string;
    profile_image?: File;
    followers: number;
    following: number;
    id: number;
    firstname: string;
    lastname: string;
    bio:string;
    created_at:string;
    location?:string;
    isFollowing?:boolean
  
  }
// {
//     "tweet_id": 12,
//     "username": "Zebra",
//     "tweet_text": "something different 12",
//     "created_at": "2023-01-26T07:42:51.000Z",
//     "retweet_count": 3,
//     "favorite_count": 3,
//     "tweet_image_path": "image-1674718971482-966520934"
//   }