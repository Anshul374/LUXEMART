import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalAmount } from "../../features/cart/getTotalAmountSlice";
import CircularProgress from "@mui/material/CircularProgress";
import "./PriceBtn.css";
import SmallLoader from "../Loading/SmallLoader";
import { useNavigate } from "react-router-dom";

const PriceBtn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, success, cart, error } = useSelector((state) => state.cart);

  const { loadingT, totalAmt } = useSelector((state) => state.getTotalAmt);

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  useEffect(() => {
    if (cart.length) {
      dispatch(getTotalAmount());
    }
  }, [dispatch, cart.length]);
  return (
    <>
      <div className="total_amount_div">
        <div className="total_amount_top_div">
          <h4>Total Amount :</h4>
          {loadingT ? (
            <SmallLoader className="smallLoader" />
          ) : (
            <h4>₹{totalAmt}</h4>
          )}
        </div>
        <button onClick={checkoutHandler}>PLACE ORDER</button>
      </div>
    </>
  );
};

export default PriceBtn;
