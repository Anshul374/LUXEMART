import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Product.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    acctiveColor: "tomato",
    size: window.innerWidth < 600 ? (18 ? window.innerWidth < 400 : 14) : 25,
    value: product.ratings,
    isHalf: true,
  };
  // console.log(window.innerWidth < "600px" ? console.log("hello") : null);
  // window.innerWidth < 600 ? 20 : 25,
  return (
    <Link className="productCard" to={`product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default Product;
