import { useState } from 'react'
import { Link } from "react-router-dom"
import middleCodeLogo from "../assets/img/middle-code-logo.png"
import useAuthContext from "../context/authContext"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const { register, errors } = useAuthContext()

    const handleRegister = async (event) => {
        event.preventDefault()
        setLoading(true)
        register({ name, email, password, password_confirmation })
            .finally(() => setLoading(false))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Welcome to middle-code.com. This is an app made in react, which consumes the backend services made in laravel.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <img src={middleCodeLogo} className="mx-auto w-48 mb-5" alt="" />
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && (
                                    <div className="flex">
                                        <span className="text-red-400 text-sm m-2 p-2">
                                            {errors.name[0]}
                                        </span>
                                    </div>
                                )}
                            </div>
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
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password Confirmation</span>
                                </label>
                                <input
                                    type="password"
                                    value={password_confirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder="Password Confirmation"
                                    className="input input-bordered"
                                />
                                <label className="label">
                                    <Link to="/login" className="label-text-alt link link-hover">
                                        Sign in
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                {loading ? (
                                    <button className="btn loading">loading</button>
                                ) : (<button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Register
                                </button>)}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register