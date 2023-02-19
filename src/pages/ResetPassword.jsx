import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import useAuthContext from '../context/authContext'

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const { token } = useParams()

    const { csrf } = useAuthContext()

    useEffect(() => {
        setEmail(searchParams.get('email'))
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await csrf()
        setErrors({})
        setStatus(null)
        try {
            const response = await axios.post('/reset-password', {
                email: email,
                token: token,
                password: password,
                password_confirmation: password_confirmation,
            })
            setStatus(response.data.status)
            setLoading(false)
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
        }
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Add Your new Password</h1>
                        <p className="py-6">Welcome to middle-code.com. This is an app made in react, which consumes the backend services made in laravel.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            {status && (
                                <div className="bg-green-700 m-2 p-2 rounded text-white">
                                    {status}
                                    <div className='m-2 p-2'>
                                        Go to <Link to="/login">Login</Link>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
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
                                        className="btn btn-primary"
                                    >
                                        Reset Password
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

export default ResetPassword