import React from "react";
import ReactStars from "react-rating-stars-component";
import profile from "../../Images/Profile.png";
import "./Review.css";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    acctiveColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={profile} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
