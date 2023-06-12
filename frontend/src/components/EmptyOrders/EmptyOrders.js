import React from "react";
import "./EmptyOrders.css";
import emptyOrder from "../../Images/6028969.jpg";
import { Link } from "react-router-dom";
const EmptyOrders = ({ admin }) => {
  return (
    <div className="emptyOrdersDiv">
      <div>
        <h3>No Orders Yet!!</h3>
        <img src={emptyOrder} alt="emptyOrder" />
        {admin === "false" ? (
          <Link to="/products">GO TO PRODUCTS</Link>
        ) : (
          <Link to="/admin/dashboard">GO TO DASHBOARD</Link>
        )}
      </div>
    </div>
  );
};

export default EmptyOrders;
