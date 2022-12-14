import React,{ useState, useEffect, createContext} from 'react'
import { authProvider } from '../firebase/firebaseAuth'

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [logged, setLogged] = useState(false);
    useEffect( ()=> {
        authProvider.authState(setUser, setLogged);
    },[]);
    const contextValue = {
        user,
        setUser,
        isLogged(){
            return logged;
        },
    }
  return (
    <AuthContext.Provider
        value={ contextValue }
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider