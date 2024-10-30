import React from "react";
import logo from "../../public/Photos/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="navbar_container">
        <Link to={"/"}>
          <div className="first_Navbar_container">
            <img width={"70px"} height={"70px"} src={logo} />
            <p>Ecommerce Store</p>
          </div>
        </Link>
        <div className="second_Navbar_container">
         <Link to={'/addproduct'}>
         <button>Add Product</button>
         </Link>
          <Link to={"/product"}>
            <button>Products</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
