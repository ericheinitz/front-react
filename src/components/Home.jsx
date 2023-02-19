import { useEffect } from 'react'
import useAuthContext from '../context/authContext'

const Home = () => {
    const { user, getUser } = useAuthContext()

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [])

    return (
        <span>
            {user ? (
                <div>
                    <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
                    <p className="text-gray-500">You are logged in!</p>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold">Welcome</h1>
                    <p className="text-gray-500">You are not logged in!</p>
                </div>
            )}
        </span>
    )
}

export default Home