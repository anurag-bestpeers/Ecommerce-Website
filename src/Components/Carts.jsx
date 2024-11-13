import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../RTK/userSlice";
import axios from "axios";
const Carts = () => {
  const singleUser = useSelector((state) => state.user.cart);
  const dispatch = useDispatch();
  const [username, setusername] = useState();
  const singleUserCart = useSelector((state) => state.user);
  useEffect(() => {
    let user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  }, []);

  const handleDelete = async (id) => {
    dispatch(removeCart(id));

    if (!username) {
      console.error("No username found. Cannot update cart.");
      return;
    }

    try {
      const filteredData = singleUserCart.cart.filter(
        (item, ind) => item.id != id
      );
      const updatedCart = filteredData;

      const response = await axios.put(
        `http://localhost:3000/users/${singleUserCart.id}`,
        {
          ...singleUserCart,
          cart: updatedCart,
        }
      );

      console.log("Item remove to cart in db:", response.data);
      console.error("User not found.");
    } catch (error) {
      console.error("Error adding to cart in db:", error);
    }
  };

  return (
    <div className="cart_container">
      <h2>Shopping Cart</h2>
      {singleUser.length > 0 ? (
        <div className="cart_items">
          {singleUser.map((item, index) => {
            return (
              <div className="item">
                <Link to={`/detail/${item.id}`}>
                  <img src={item.image} width={100} />
                </Link>
                <h3>{item.title.slice(0, 10) + "..."}</h3>
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
