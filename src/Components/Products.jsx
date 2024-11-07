import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider";
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../Services/commonApi";
const Products = () => {
  const [users, setUsers] = useState([]);
  const { products, getData, softDelete, getCategory } =
    useContext(ProductContext);

  const [username, setusername] = useState("");

  const handleSoftDelete = (id) => {
    softDelete(id);
  };

  const handleCart = async (item) => {
    const foundUser = users.find((element) => element.username === username);

    const isDuplicate = foundUser.cart.some(
      (cartItem) => cartItem.id === item.id
    );

    if (isDuplicate) {
      toast.error("Item already in the cart");
      return;
    }

    try {
      await api("patch", `http://localhost:3000/users/${foundUser.id}`, {
        cart: [...foundUser.cart, item],
      });
      toast.success("Item added to the cart.");
    } catch (error) {
      console.error("Error updating the cart:", error);
    }
  };

  const handleWishlist = async (item) => {
    const foundUser = users.find((element) => element.username === username);

    const isDuplicate = foundUser.wishlist.some(
      (cartItem) => cartItem.id === item.id
    );

    if (isDuplicate) {
      toast.error("Item already in the cart");
      return;
    }

    setTimeout(async () => {
      await api("patch", `http://localhost:3000/users/${foundUser.id}`, {
        wishlist: [...foundUser.wishlist, item],
      });
    }, 0);
    toast.success("Item added to wishlist");
  };

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  }, []);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api("get", "http://localhost:3000/users");
        setUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [users]);

  useEffect(() => {
    getData();
  }, [token]);

  return (
    <div className="product_container">
      {products && products.length > 0 ? (
        products.map((item) => {
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
                {getCategory == "seller" && (
                  <div className="productBtn">
                    <Link to={`/updateproduct/${item.id}`}>
                      <button>
                        <MdEdit />
                      </button>
                    </Link>
                    <button onClick={() => handleSoftDelete(item.id)}>
                      <MdOutlineDelete />
                    </button>
                  </div>
                )}

                <div className="wishlist">
                  <button
                    onClick={() => handleCart(item)}
                    className="detailBtn"
                  >
                    Add to cart
                  </button>

                  <FaHeart
                    className="activeWishlist"
                    onClick={() => handleWishlist(item)}
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
