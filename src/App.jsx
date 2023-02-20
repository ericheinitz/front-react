import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";

// Products
import ListProducts from "./pages/products/ListProducts";
import CreateEditProduct from "./pages/products/CreateEditProduct";
import ShowProduct from "./pages/products/ShowProduct";

function App() {
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          {/* Products */}
          <Route path="/products" element={<ListProducts />} />
          <Route path="/product" element={<CreateEditProduct />} />
          <Route path="/product/:id" element={<ShowProduct />} />
          <Route path="/product/:id/edit" element={<CreateEditProduct />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
  )
}
export default App
