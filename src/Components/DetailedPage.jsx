import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./ProductProvider";
import api from "../Services/commonApi";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
const DetailedPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const [singleUser, setSingleUser] = useState({});
  // const[wishArray,setWishArray]=useState();
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    const filterUser = products.filter((item, _) => item.id == id);
    setSingleUser(filterUser);
    console.log(singleUser);
  }, []);
  const handleCart = async () => {
    await api("post", "http://localhost:3000/carts", singleUser);
    toast.success("Item added to cart");
  };

  const handleWishlist = async () => {
    if (wishlist) {
      setWishlist(!wishlist);
      toast.error("removed");

      // await axios.delete(`http://localhost:3000/wishlist/${id}`);
    } else {
      setWishlist(!wishlist);
      await api("post", "http://localhost:3000/wishlist", singleUser);
      toast.success("Item added to wishlist");
    }
  };
  return (
    <div className="product_container">
      {products &&
        products.map((item, index) => {
          if (id == item.id) {
            return (
              <div key={index} className="detailitem">
                <img src={item.image} alt="dds" />
                <div className="innerItems">
                  <h4>{item.title.toUpperCase().slice(0, 27) + "..."}</h4>
                  <div className="price_rating">
                    <p>Price - ${Math.round(item.price)}</p>
                    <p>Rating - {item.rating.rate}</p>
                  </div>
                  <div className="wishlist">
                    <button onClick={handleCart} className="detailBtn">
                      Add to cart
                    </button>

                    <FaHeart
                      className={wishlist ? "activeWishlist" : ""}
                      onClick={handleWishlist}
                    />
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
