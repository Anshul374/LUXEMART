import React from "react";
import "./EmptyCard.css";
import { useNavigate } from "react-router-dom";
// import emptybag from "../../Images/empty-bag.png";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const EmptyCard = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-cart">
      <RemoveShoppingCartIcon />
      {/* <img src={emptybag} alt="emptybag" /> */}
      <h3>Hey, it feels so light!</h3>
      <p>There is nothing in your bag. Let's add some items.</p>
      <button onClick={() => navigate("/products")}>
        ADD ITEMS FROM PRODUCTS
      </button>
    </div>
  );
};

export default EmptyCard;
