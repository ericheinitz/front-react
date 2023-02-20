import { Navigate, Outlet, Link } from "react-router-dom"
import useAuthContext from "../context/authContext"
import middleCodeLogo from "../assets/img/middle-code-logo.png"

const AuthLayout = () => {
    const { user, logout } = useAuthContext()

    return user ? (
        <>
            <div className="navbar bg-base-300 shadow-2xl shadow-emerald-900">
                <div className="flex-1">
                    <img src={middleCodeLogo} className="w-32 mr-3" alt="" />
                    <Link
                        to="/"
                        className="btn btn-ghost normal-case text-xl"
                        aria-current="page"
                    >Home</Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            {user?.name}
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl shadow-emerald-900 bg-base-300 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
        : <Navigate to="/login" />
}

export default AuthLayout