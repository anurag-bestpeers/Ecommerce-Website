import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ProductContext } from "./ProductProvider";
function Home() {
  const { tokenExist } = useContext(ProductContext);
  const [username, setusername] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  });
  return (
    <>
      <div
        id="carouselExample"
        className="carousel slide "
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        {tokenExist && <h3 style={{position:'relative',zIndex:99,textAlign:'center'}}>welcome {username}</h3>}
        <div className="carousel-inner">
          <div className="carousel-item active">
            
            <img
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "590px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "590px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/934069/pexels-photo-934069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "590px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block mx-auto"
              alt="Slide 2"
              style={{ minWidth: "100%", height: "590px" }}
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        </div>

        {/* <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        style={{ top: "10%",left:"15%" }} // Adjusts the position of the previous button
      >
        <span
          className="carousel-control-prev-icon bg-dark rounded-circle"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        style={{ top: "10%",right:"15%" }} // Adjusts the position of the next button
      >
        <span
          className="carousel-control-next-icon bg-dark rounded-circle"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button> */}
      </div>
    </>
  );
}

export default Home;
