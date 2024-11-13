import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import DetailedPage from "./Components/DetailedPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carts from "./Components/Carts";
import Wishlist from "./Components/Wishlist";
import Products from "./Components/Products";

const AppContent = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={500} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/product" element={<Products />} />
            <Route path="/detail/:id" element={<DetailedPage />} />
            <Route path="/cart" element={<Carts />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

const App = () => {
  return (
      <AppContent />
  );
};

export default App;
