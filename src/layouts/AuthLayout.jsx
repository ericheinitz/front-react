import { Navigate, Outlet, Link } from "react-router-dom"
import useAuthContext from "../context/authContext"
import Footer from './Footer'
import Navbar from "./Navbar"

const AuthLayout = () => {
    const { user } = useAuthContext()

    return user ? (
        <>
            <div className="flex flex-col h-screen justify-between">
                <Navbar />
                <div className=" flex-grow mb-14 mt-5">
                    <Outlet />
                </div>
                <div className="">
                    <Footer />
                </div>
            </div>
        </>
    )
        : <Navigate to="/login" />
}

export default AuthLayout