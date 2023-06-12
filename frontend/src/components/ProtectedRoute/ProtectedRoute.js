import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.currentLoginUser
  );
  console.log(props);
  return <></>;
};

export default ProtectedRoute;
