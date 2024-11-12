import React, { useEffect, useState } from "react";
import api from "../Services/commonApi";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../RTK/userSlice";
const Carts = () => {
  const [username, setusername] = useState("");
  const [users, setUsers] = useState([]);
  const [userCart, setuserCart] = useState([]);
  const singleUser = useSelector((state) => state.user.cart);
  const dispatch=useDispatch()
  console.log("Cart state:", singleUser); 

  
  
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setusername(user);
    }
  }, []);



  const handleDelete = async (id) => {
    dispatch(removeCart(id))
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
                <h3>{item.title.slice(0, 10)+"..."}</h3>
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
