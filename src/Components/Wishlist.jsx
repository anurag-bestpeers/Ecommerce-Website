import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../RTK/userSlice";
import axios from "axios";
const Wishlist = () => {
  const singleUser = useSelector((state) => state.user.wishlist);
  const dispatch = useDispatch();
  const [username, setusername] = useState();
  const singleUserWishList = useSelector((state) => state.user);
  useEffect(() => {
    let user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  }, []);

  const handleDelete = async (id) => {
    dispatch(removeFromWishList(id));

    if (!username) {
      console.error("No username found. Cannot update cart.");
      return;
    }

    try {
      const filteredData = singleUserWishList.wishlist.filter(
        (item, ind) => item.id != id
      );
      const updatedCart = filteredData;

      const response = await axios.put(
        `http://localhost:3000/users/${singleUserWishList.id}`,
        {
          ...singleUserWishList,
          wishlist: updatedCart,
        }
      );

      console.log("Item remove to cart in db:", response.data);
    } catch (error) {
      console.error("Error adding to cart in db:", error);
    }
  };

  return (
    <div className="cart_container">
      <h2> Wishlist</h2>
      {singleUser.length > 0 ? (
        <div className="cart_items">
          {singleUser.map((item, index) => {
            return (
              <div key={index} className="item">
                <img src={item.image} />
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
          <p>No Items In The Wishlist</p>
          <hr />
        </>
      )}
    </div>
  );
};

export default Wishlist;
