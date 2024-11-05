import React, { useContext, useEffect, useState } from "react";
import api from "../Services/commonApi";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [carts1, setCarts1] = useState([]);
  const { getCategory } = useContext(ProductContext);

  const fetchData = async () => {
    await api("get", "http://localhost:3000/carts")
      .then((res) => setCarts(res))
      .catch((err) => console.log("Error Occured", err));

    const wishlistItems = carts.map((item) => item["0"]);
    setCarts1(wishlistItems);
  };

  useEffect(() => {
    fetchData();
  }, [carts]);
  return (
    <div className="product_container">
      {carts1 && carts1.length > 0 ? (
        carts1.map((item) => {
          return (
            <div key={item.id} className="items">
              <Link to={`/detail/${item.id}`}>
                <img src={item.image} alt={item.imageAlt || "Product Image"} />
              </Link>
              <div className="innerItems">
                <h4>
                  {(item.title ? item.title.toUpperCase() : "Untitled").slice(
                    0,
                    40
                  ) + "..."}
                </h4>
                <div className="price_rating">
                  <p>Price - ${Math.round(item.price)}</p>
                  <p>Rating - {item.rating?.rate}</p>
                </div>
                
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Carts;
