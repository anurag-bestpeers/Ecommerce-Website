import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ProductContext } from "./ProductProvider";

const ProtectedRoutes = () => {
  const { tokenExist } = useContext(ProductContext);
  return <div>{tokenExist ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default ProtectedRoutes;
