import React, { useState } from "react";
import api from "../Services/commonApi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const SignupPage = () => {
  const [newSignUp, setNewSignUp] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let trimValue=value.trim();

    setNewSignUp({
      ...newSignUp,
      [name]: trimValue,
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
      if (newSignUp[item] == "") {
        msg[item] = `${item} is required`;
      }
    });

    return msg;
  };

  const handleSignup = async () => {
    let validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
      await api("post", "http://localhost:3000/users", newSignUp);
      toast.success("success");
      setNewSignUp({
        username: "",
        password: "",
      });
  };
  return (
    <>
      <h2 className="signupHeading">User Signup Page</h2>
      <div className="signup-container">
        <div>
          <label>Enter Username</label>
          <input
            type="text"
            value={newSignUp.username}
            name="username"
            onChange={handleChange}
          />
          <p>{errors.username && errors.username}</p>
        </div>
        <div>
          <label>Enter Password</label>
          <input
            type="password"
            value={newSignUp.password}
            name="password"
            onChange={handleChange}
          />
          <p>{errors.password && errors.password}</p>
        </div>
        <div>
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div>
            <span className="span">already have an account ?</span> <Link to={'/login'}>Log in</Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
