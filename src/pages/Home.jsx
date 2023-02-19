import useAuthContext from '../context/authContext'

const Home = () => {
    const { user } = useAuthContext()

    return (
        <div className='max-w-7xl mx-auto mt-12'>
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
        </div>
    )
}

export default Home