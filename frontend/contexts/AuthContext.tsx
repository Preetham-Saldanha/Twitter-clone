import { createContext, useState } from 'react'
import { UserAuth } from '../typings'
const AuthContext = createContext({})



export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<UserAuth>({
        username: '',
        email: '',
        profile_image_path: '',
        id: -1,
        firstname:'',
        lastname:'',
        accessToken: ''
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;