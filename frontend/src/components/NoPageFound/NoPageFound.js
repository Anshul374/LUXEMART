import React from "react";
import { Link } from "react-router-dom";
import noPage from "../../Images/5203299.jpg";
import "./NoPageFound.css";

const NoPageFound = () => {
  return (
    <div className="noPageDiv">
      <div>
        <h3>PAGE NOT FOUND</h3>
        <img src={noPage} alt="noPage" />
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default NoPageFound;
