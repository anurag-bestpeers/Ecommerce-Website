import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  return (
    <div className="product_container">
      {products &&
        products.map((item, index) => {
          return (
            <div key={index} className="items">
              <Link to={`/detail/${item.id}`}>
                {" "}
                <img src={item.image} alt="dds" />
              </Link>
              <div className="innerItems">
                <h4>{item.title.toUpperCase().slice(0, 27) + "..."}</h4>
                <div className="price_rating">
                  <p>Price - ${Math.round(item.price)}</p>
                  <p>Rating - {item.rating.rate}</p>
                </div>
                <button>Buy Now</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
