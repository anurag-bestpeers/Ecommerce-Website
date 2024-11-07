import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./ProductProvider";


const DetailedPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  return (
    <div className="detail_container">
      {products &&
        products.map((item, index) => {
          if (id == item.id) {
            return (
              <div key={index} className="detailitem1">
              <div className="innerItems1">
              <img src={item.image} width={100} alt="Product" />
              </div>
                <div className="innerItems2">
                  <h4>{item.title.toUpperCase().slice(0,20)}</h4>
                  <p>{(item.description).slice(0,300)+"..."}</p>
                  <div className="price_rating">
                    <p>Price - ${Math.round(item.price)}</p>
                    <p>Rating - {item.rating.rate}</p>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default DetailedPage;


