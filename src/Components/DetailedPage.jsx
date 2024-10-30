import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./ProductProvider";

const DetailedPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  return (
    <div className="product_container">
      {products &&
        products.map((item, index) => {
          if ((id) == item.id) {
            return (
              <div key={index} className="items">
                <img src={item.image} alt="dds" />
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
          }
        })}
    </div>
  );
};

export default DetailedPage;
