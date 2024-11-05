import { useContext } from "react";
import logo from "../../public/Photos/logo.png";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider";
import { BsCart3 } from "react-icons/bs";
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
            <Link
              className="navbar-brand fw-bold text-uppercase text-light"
              to={"/"}
            >
              LuxeMart
            </Link>
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

          {tokenExist ? (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex align-items-center">
                <li className="nav-item me-3 d-flex align-items-center position-relative">
                  <Link to="/">
                    <BsCart3 className="text-light fs-2" />
                    <span
                      className="badge bg-light text-dark position-absolute"
                      style={{ top: "-0.5rem", right: "-0.5rem" }}
                    >
                     0
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/addproduct"}>
                    <button type="button" className="btn btn-outline-light m-2">
                      Add Products
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/product"}>
                    <button type="button" className="btn btn-outline-light m-2">
                      Products
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <Link to={"/login"}>
                  <li className="nav-item">
                    <button type="button" className="btn btn-outline-light">
                      Login
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
