import React, { useEffect, useState } from "react";
import api from "../Services/commonApi";
import { ToastContainer, toast } from "react-toastify";
const LoginPage = () => {
  const [newLogin, setNewLogin] = useState({
    username: "",
    password: "",
  });

  const [userData, setUserData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewLogin({
      ...newLogin,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let arr = ["username", "password"];
    let msg = {};

    arr.forEach((item) => {
      if (newLogin[item] == "") {
        msg[item] = `${item} is required`;
      }
    });

    return msg;
  };

  const handleLogin = () => {
    let validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    let loginSuccessful = false;
    userData.forEach((element) => {
      if (
        element.username == newLogin.username &&
        element.password == newLogin.password
      ) {
        loginSuccessful = true;
      }
    });

    if (loginSuccessful) {
      toast.success("Login Success");
      setNewLogin({
        username: "",
        password: "",
      });
    } else {
      toast.error("invalid Credentials");
    }
  };

  const fetchData = async () => {
    const responseData = await api("get", "http://localhost:3000/users");
    setUserData(responseData);
  };

  useEffect(() => {
    fetchData();
  }, [userData]);
  return (
    <>
      <h2 className="loginHeading">User Login Page</h2>
      <div className="login-container">
        <div>
          <label>Enter Username</label>
          <input
            type="text"
            value={newLogin.username}
            name="username"
            onChange={handleChange}
          />
          <p>{errors.username && errors.username}</p>
        </div>
        <div>
          <label>Enter Password</label>
          <input
            type="password"
            value={newLogin.password}
            name="password"
            onChange={handleChange}
          />
          <p>{errors.password && errors.password}</p>
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
