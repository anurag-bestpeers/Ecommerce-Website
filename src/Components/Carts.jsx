import React, { useContext, useEffect, useState } from "react";
import api from "../Services/commonApi";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
const Carts = () => {
  const [username, setusername] = useState("");
  const [users, setUsers] = useState([]);
  const [userCart, setuserCart] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await api("get", "http://localhost:3000/users");
      setUsers(res);

      users.forEach((item) => {
        if (item.cart.length >= 0 && item.username == username) {
          setuserCart(item.cart);
        }
      });
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };

  const handleDelete = async (id) => {
    const foundUser = users.find((element) => element.username === username);

    if (!foundUser) {
      toast.error("User not found");
      return;
    }

    const filteredData = foundUser.cart.filter((item) => item.id !== id);

    try {
      await api("patch", `http://localhost:3000/users/${foundUser.id}`, {
        cart: filteredData,
      });
      toast.error("Item removed from cart");

      setuserCart(filteredData);
    } catch (error) {
      console.error("Error updating the cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  useEffect(() => {
    fetchData();
  }, [users]);

  return (
    <div className="cart_container">
      <h2>Shopping Cart</h2>
      {userCart.length > 0 ? (
        <div className="cart_items">
          {userCart.map((item, index) => {
            return (
              <div className="item">
                <img src={item.image} width={100} />
                <h3>{item.title.slice(0, 20)}</h3>
                <p>${item.price}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="delete-btn"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <hr />
          <p>No Items In The Cart</p>
          <hr />
        </>
      )}
    </div>
  );
};

export default Carts;
