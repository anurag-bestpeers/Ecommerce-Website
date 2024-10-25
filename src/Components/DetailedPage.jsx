import React from "react";
import { useParams } from "react-router-dom";

const DetailedPage = ({ products }) => {
  const { id } = useParams();

  return (
    <div className="product_container">
      {products &&
        products.map((item, _) => {
          if (Number(id) == item.id) {
            return (
              <div className="items">
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
