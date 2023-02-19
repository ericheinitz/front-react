import { createContext, useContext, useEffect, useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"
import Loading from '../components/Loading';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true) // Estado de carga
    const navigate = useNavigate();

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getUser = async () => {
        setLoading(true); // Establecer estado de carga en true
        const { data } = await axios.get("/api/user");
        setUser(data);
        setLoading(false);
    }

    const login = async ({ email, password }) => {
        await csrf()
        setErrors({})
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
        setErrors({})
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

    // Se envuelve todo el contenido en una expresión ternaria que comprueba si se está cargando el usuario
    return loading ? (
        <Loading />
    ) : (
        <AuthContext.Provider value={{ user, errors, getUser, login, register, logout, csrf }}>
            {children}
        </AuthContext.Provider>
    );

}

export default function useAuthContext() {
    return useContext(AuthContext);
}