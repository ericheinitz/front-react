import { Navigate, Link, Routes, Route } from "react-router-dom";
import useAuthContext from "./context/authContext"

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AuthLayout from "./layouts/authLayout";
import GuestLayout from "./layouts/GuestLayout";

function App() {
  const { user, logout } = useAuthContext()
  return (
    <div className="bg-slate-100 min-h-screen">
      <nav className="bg-indigo-900 text-white shadow-xl px-2 py-2.5 sm:px-4">
        <div
          className="container mx-auto flex flex-wrap items-center justify-between"
          bis_skin_checked="1"
        >
          <a href="https://middle-code.com/" className="flex items-center">
            middle-code
          </a>
          <div
            className="hidden w-full md:block md:w-auto"
          >
            <ul
              className="
            mt-4
            flex flex-col
            rounded-lg
            p-4
            md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium
          "
            >
              <li>
                <Link
                  to="/"
                  className="block rounded py-2 pr-4 pl-3 text-white"
                  aria-current="page"
                >Home</Link>
              </li>
              {user ? (
                <li>
                  <button onClick={logout} className="block rounded py-2 pr-4 pl-3 text-orange-500">
                    Logout
                  </button>
                </li>
              ) :
                (<>
                  <li>
                    <Link
                      to="/login"
                      className="block rounded py-2 pr-4 pl-3 text-white"
                      aria-current="page"
                    >Login</Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block rounded py-2 pr-4 pl-3 text-white"
                      aria-current="page"
                    >Register</Link>
                  </li>
                </>)}
            </ul>
          </div >
        </div >
      </nav >
      <div className="max-w-7xl mx-auto mt-6">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div >
  )
}
export default App
