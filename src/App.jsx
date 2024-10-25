import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Products from "./Components/Products";
import axios from "axios";
import DetailedPage from "./Components/DetailedPage";
const App = () => {
  const [products, setProducts] = useState();

  const fetchData = async (url) => {
    const req = await axios.get(url);
    let response = await req.data;
    setProducts(response);
  };

  useEffect(() => {
    fetchData("http://localhost:3000/products");
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products products={products} />} />
          <Route
            path="/detail/:id"
            element={<DetailedPage products={products} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
