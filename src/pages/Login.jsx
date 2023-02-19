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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome to middle-code.com. This is an app made in react, which consumes the backend services made in laravel.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"
                                    className="input input-bordered"
                                />

                                {errors.email && (
                                    <div className="flex">
                                        <span className="text-red-400 text-sm m-2 p-2">
                                            {errors.email[0]}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.password && (
                                    <div className="flex">
                                        <span className="text-red-400 text-sm m-2 p-2">
                                            {errors.password[0]}
                                        </span>
                                    </div>
                                )}
                                <label className="label">
                                    <Link
                                        to="/forgot-password"
                                        className="label-text-alt link link-hover"
                                    >
                                        Forgot Password?
                                    </Link>
                                    <Link to="/register" className="label-text-alt link link-hover">
                                        Sign Up
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                {loading ? (
                                    <button className="btn loading">loading</button>
                                ) : (<button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>)}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login