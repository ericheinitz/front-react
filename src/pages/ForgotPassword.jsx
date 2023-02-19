import { useState } from 'react'
import { Link } from "react-router-dom"
import axios from '../api/axios'
import useAuthContext from '../context/authContext'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const { csrf } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await csrf()
        setErrors({})
        setStatus(null)
        try {
            const response = await axios.post('/forgot-password', {
                email: email,
            })
            setStatus(response.data.status)
            setLoading(false)
        } catch (error) {
            if (error.response.status === 422) {
                setLoading(false)
                setErrors(error.response.data.errors)
            }
        }
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Recovery Password</h1>
                        <p className="py-6">Forgot your password? Let us know your email address and we will
                            email you a password reset link.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            {status && <div className="bg-green-700 m-2 p-2 rounded text-white">{status}</div>}
                            <form onSubmit={handleSubmit}>
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
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>)}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword