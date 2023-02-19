import { createContext, useContext, useEffect, useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getUser = async () => {
        const { data } = await axios.get("/api/user");
        setUser(data);
    }

    const login = async ({ email, password }) => {
        await csrf()
        try {
            await axios.post('/login', {
                email: email,
                password: password,
            })
            await getUser()
            navigate('/')
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const register = async ({ name, email, password, password_confirmation }) => {
        await csrf()
        try {
            await axios.post('/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
            })
            await getUser()
            navigate('/')
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const logout = async () => {
        await axios.post('/logout').then(() => {
            setUser(null)
        })
    }

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, errors, getUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default function useAuthContext() {
    return useContext(AuthContext);
}