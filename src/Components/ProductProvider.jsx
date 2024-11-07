import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../Services/commonApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  const [newLogin, setNewLogin] = useState({
    username: "",
    password: "",
  });

  const softDelete = async (id) => {
    await api("patch", `http://localhost:3000/products/${id}`, {
      deleted: true,
    });
    toast.success("Item deleted...");
    getData();
  };
  const getData = () => {
    const responseData = api("get", "http://localhost:3000/products");
    responseData.then((res) => setProducts(res));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getData,
        softDelete,
        newLogin,
        setNewLogin,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
