import React from "react";
import logo from "../../public/Photos/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar_container">
        <div className="first_Navbar_container">
          <img width={"70px"} height={"70px"} src={logo} />
          <Link to={"/"}>
            <p>Ecommerce Store</p>
          </Link>
        </div>
        <div className="second_Navbar_container">
          <Link to={"/addproduct"}>Add Product</Link>
          <Link to={"/product"}>Products</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
