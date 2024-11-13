import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../RTK/productSlice";
import { addToCart, addToWishList, removeFromWishList } from "../RTK/userSlice";
import axios from "axios";

const Products = () => {
  const [username, setusername] = useState();
  const dispatch = useDispatch();
  const pro = useSelector((state) => state.product.products);
  const singleUserWishlist = useSelector((state) => state.user.wishlist);
  const singleUser = useSelector((state) => state.user);
  useEffect(() => {
    let user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
    dispatch(fetchProducts());
  }, []);

  const handleCart = async (item) => {
    dispatch(addToCart(item));

    if (!username) {
      console.error("No username found. Cannot update cart.");
      return;
    }

    try {
      if (singleUser.cart.some((cartItem) => cartItem.id === item.id)) {
        console.log("Item is already in the cart.");
        return;
      }

      const updatedCart = [...singleUser.cart, item];

      const response = await axios.patch(
        `http://localhost:3000/users/${singleUser.id}`,
        {
          ...singleUser,
          cart: updatedCart,
        }
      );

      console.log("Item added to cart in db:", response.data);
    } catch (error) {
      console.error("Error adding to cart in db:", error);
    }
  };

  const handleWishlist = async (item) => {
    if (!username) {
      console.error("No username found. Cannot update wishlist.");
      return;
    }

    try {
      const isInWishlist = singleUser.wishlist.some(
        (cartItem) => cartItem.id === item.id
      );

      let updatedWishlist;

      if (isInWishlist) {
        updatedWishlist = singleUser.wishlist.filter(
          (cartItem) => cartItem.id !== item.id
        );
        dispatch(removeFromWishList(item.id));
      } else {
        updatedWishlist = [...singleUser.wishlist, item];
        dispatch(addToWishList(item));
      }

      await axios.patch(`http://localhost:3000/users/${singleUser.id}`, {
        wishlist: updatedWishlist,
      });

      console.log("Wishlist updated successfully in the database.");
    } catch (error) {
      console.error("Error updating wishlist in db:", error);
    }
  };

  return (
    <div className="product_container">
      {pro && pro.length > 0 ? (
        pro.map((item) => {
          const isInWishlist = singleUserWishlist.some(
            (wishlistItem) => wishlistItem.id === item.id
          );
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

                <div className="wishlist">
                  <button
                    onClick={() => handleCart(item)}
                    className="detailBtn"
                  >
                    Add to cart
                  </button>
                  <FaHeart
                    className={`activeWishlist ${
                      isInWishlist ? "in-wishlist" : ""
                    }`}
                    onClick={() => handleWishlist(item)}
                    style={{
                      color: isInWishlist ? "red" : "grey",
                      cursor: "pointer",
                    }}
                  />
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

export default Products;
