import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Products from "./Components/Products";
import DetailedPage from "./Components/DetailedPage";
import { ProductProvider } from "./Components/ProductProvider";
import AddProduct from "./Components/AddProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProduct from "./Components/UpdateProduct";
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";
const App = () => {
  const [tokenExist, setTokenExist] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenExist(false);
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      setTokenExist(true);
    }
  }, [tokenExist]);
  return (
    <>
      <ToastContainer position="top-center" autoClose={500} />
      <ProductProvider>
        <Router>
          <Navbar tokenExist={tokenExist} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/product" element={<Products />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage setTokenExist={setTokenExist}/>} />
            <Route path="/detail/:id" element={<DetailedPage />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          </Routes>
        </Router>
      </ProductProvider>
    </>
  );
};

export default App;
