import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectRoutes = () => {
  const token = sessionStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoutes;