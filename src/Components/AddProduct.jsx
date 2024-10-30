import React, { useContext, useState, useRef, useId } from "react";
import { ProductContext } from "./ProductProvider";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../Services/commonApi";

const AddProduct = () => {
  const { getData, products } = useContext(ProductContext);
  const uniqueId = useId();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uniqueId,
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    imageAlt: "",
    deleted: false,
    rating: { rate: "" },
  });

  const [errorMsg, setErrorMsg] = useState({});
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const rateRef = useRef(null);
  const BtnRef = useRef(null);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image" && files[0]) {
      const file = files[0];
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, image: base64, imageAlt: file.name });
    } else if (name === "rate") {
      setFormData({ ...formData, rating: { rate: parseFloat(value) } });
    } else {
      setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
    }

    setErrorMsg({ ...errorMsg, [name]: "" });
  };

  const handleValidate = () => {
    let errors = {};
    const requiredFields = ["title", "price", "description", "category", "rate"];
    requiredFields.forEach((field) => {
      if (field === "rate" && formData.rating.rate === "") {
        errors[field] = `${field} is required!`;
      } else if (formData[field] === "") {
        errors[field] = `${field} is required!`;
      }
    });
    return errors;
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const validationErrors = handleValidate();
    if (Object.keys(validationErrors).length > 0) {
      setErrorMsg(validationErrors);
      return;
    }

    try {
      const isDuplicate = products.some(
        (product) => product.title ? product.title.toLowerCase() === formData.title.toLowerCase():''
      );

      if (isDuplicate) {
        toast.error("Item already exists");
      } else {
        await api("post", "http://localhost:3000/products", formData);
        getData();
        toast.success("Item Added");
        resetForm();
        navigate("/product");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      uniqueId,
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      imageAlt: "",
      rating: { rate: "" },
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  return (
    <div className="addProductContainer">
      <form onSubmit={handleForm} className="form_container">
        <div>
          <label>Enter Title</label>
          <input
            className={errorMsg.title ? "error" : ""}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, priceRef)}
            ref={titleRef}
          />
          <p>{errorMsg.title && errorMsg.title}</p>
        </div>

        <div>
          <label>Enter Price</label>
          <input
            type="number"
            className={errorMsg.price ? "error" : ""}
            name="price"
            value={formData.price}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
            ref={priceRef}
          />
          <p>{errorMsg.price && errorMsg.price}</p>
        </div>

        <div>
          <label>Enter Description</label>
          <textarea
            className={errorMsg.description ? "error" : ""}
            name="description"
            value={formData.description}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, categoryRef)}
            ref={descriptionRef}
          />
          <p>{errorMsg.description && errorMsg.description}</p>
        </div>

        <div>
          <label>Enter Category</label>
          <select
            name="category"
            className={errorMsg.category ? "error" : ""}
            value={formData.category}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, rateRef)}
            ref={categoryRef}
          >
            <option value="" disabled>Select</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <p>{errorMsg.category && errorMsg.category}</p>
        </div>

        <div>
          <label>Enter Rating</label>
          <input
            type="number"
            name="rate"
            className={errorMsg.rate ? "error" : ""}
            value={formData.rating.rate}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, BtnRef)}
            ref={rateRef}
          />
          <p>{errorMsg.rate && errorMsg.rate}</p>
        </div>

        <div>
          <label>Select Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        <button ref={BtnRef} type="submit">
          Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
