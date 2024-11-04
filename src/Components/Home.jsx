import React from "react";
import homeLogo from '../../public/Photos/cropedLogo.jpg';
const Home = () => {
  return (
    <>
      <div className="home_container">
        <h2>Welcome To Our Store</h2>
        <img src={homeLogo} alt="" />
      </div>
    </>
  );
};

export default Home;
