import { useState } from 'react'
import { Link } from "react-router-dom"
import useAuthContext from "../context/authContext"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, errors } = useAuthContext()

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        login({ email, password })
            .finally(() => setLoading(false))

    }

    return (
        <>
            <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div
                                className="
                                        shadow-xl
                                        relative
                                        mx-auto
                                        max-w-[525px]
                                        overflow-hidden
                                        rounded-lg
                                        bg-white
                                        py-16
                                        px-10
                                        text-center
                                        sm:px-12
                                        md:px-[60px]
                                    "
                            >
                                <div className="mb-10 text-center md:mb-16">middle-code</div>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            className="
                                                    bordder-[#E9EDF4]
                                                    w-full
                                                    rounded-md
                                                    border
                                                    bg-[#FCFDFE]
                                                    py-3
                                                    px-5
                                                    text-base text-body-color
                                                    placeholder-[#ACB6BE]
                                                    outline-none
                                                    focus:border-primary
                                                    focus-visible:shadow-none
                                                    "
                                        />
                                        {errors.email && (
                                            <div className="flex">
                                                <span className="text-red-400 text-sm m-2 p-2">
                                                    {errors.email[0]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="
                                                    bordder-[#E9EDF4]
                                                    w-full
                                                    rounded-md
                                                    border
                                                    bg-[#FCFDFE]
                                                    py-3
                                                    px-5
                                                    text-base text-body-color
                                                    placeholder-[#ACB6BE]
                                                    outline-none
                                                    focus:border-primary
                                                    focus-visible:shadow-none
                                                    "
                                        />
                                        {errors.password && (
                                            <div className="flex">
                                                <span className="text-red-400 text-sm m-2 p-2">
                                                    {errors.password[0]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-10">
                                        {loading ? (
                                            <button
                                                disabled
                                                className="
                                                    w-full
                                                    px-4
                                                    py-3
                                                    bg-indigo-300
                                                    rounded-md
                                                    text-white
                                                    cursor-progress
                                                    "
                                            >
                                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                </svg>
                                                Loading...
                                            </button>
                                        ) : (<button
                                            type="submit"
                                            className="
                                                    w-full
                                                    px-4
                                                    py-3
                                                    bg-indigo-500
                                                    hover:bg-indigo-700
                                                    rounded-md
                                                    text-white
                                                    "
                                        >
                                            Login
                                        </button>)}
                                    </div>
                                </form>
                                <Link
                                    to="/forgot-password"
                                    className="
                                            mb-2
                                            inline-block
                                            text-base text-[#adadad]
                                            hover:text-primary hover:underline
                                            "
                                >
                                    Forgot Password?
                                </Link>
                                <p className="text-base text-[#adadad]">
                                    Not a member yet?
                                    <Link to="/register" className="text-primary hover:underline">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Login