import { useContext } from "react";
import logo from "../../public/Photos/logo.png";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider";

const Navbar = ({ handleLogout }) => {
  const { tokenExist } = useContext(ProductContext);
  return (
    <>
      {/* {tokenExist ? (
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
            <Link to={'/'}>
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="navbar_container">
          <div className="first_Navbar_container">
            <img width={"70px"} height={"70px"} src={logo} />
            <Link to={"/"}>
              <p>Ecommerce Store</p>
            </Link>
          </div>
          <div className="second_Navbar_container">
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
          </div>
        </div>
      )} */}

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <div className="d-flex align-items-center gap-2">
      <img src={logo} width={50} height={50} alt="" />
      <a className="navbar-brand fw-bold text-uppercase text-light" href="#">
        LuxeMart
      </a>
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        {/* Uncomment if needed */}
        {/* <li className="nav-item">
          <a className="nav-link" href="#features">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#about">
            About Us
          </a>
        </li> */}
        <li className="nav-item">
          <button type="button" className="btn btn-outline-light">
            Login
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </>
  );
};

export default Navbar;
