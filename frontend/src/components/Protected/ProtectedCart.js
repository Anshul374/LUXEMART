import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedCart = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return <></>;
};

export { ProtectedCart };
