import { createContext, useState } from 'react'
import { UserAuth } from '../typings'
const AuthContext = createContext({})



export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<UserAuth>({
        username: '',
        email: '',
        profile_image_path: '',
        followers: -1,
        following: -1,
        id: -1,
        accessToken: ''
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;