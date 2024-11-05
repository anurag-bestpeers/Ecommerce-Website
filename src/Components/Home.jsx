import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../public/Photos/logo.png"; // Ensure you have 3 different image paths
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function Home() {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {/* First Slide */}
        <div className="carousel-item active">
        <img src={logo} className="d-block mx-auto" alt="Slide 2" style={{ maxWidth: "60%", height: "auto" }} />
          <div className="carousel-caption d-none d-md-block">
            {/* <h5>First Slide Label</h5>
            <p>Some representative placeholder content for the first slide.</p> */}
          </div>
        </div>

        {/* Second Slide */}
        <div className="carousel-item">
        <img src={logo} className="d-block mx-auto" alt="Slide 2" style={{ maxWidth: "60%", height: "auto" }} />
          <div className="carousel-caption d-none d-md-block">
            {/* <h5>Second Slide Label</h5>
            <p>Some representative placeholder content for the second slide.</p> */}
          </div>
        </div>

        {/* Third Slide */}
        <div className="carousel-item">
        <img src={logo} className="d-block mx-auto" alt="Slide 2" style={{ maxWidth: "60%", height: "auto" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third Slide Label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
  <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
  <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
    </div>
  );
}

export default Home;
