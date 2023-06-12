import React, { useState } from "react";
import "./ErrorAlert.css";
import caution from "../../Images/caution (1).png";
import close from "../../Images/close (1).png";
import { useDispatch } from "react-redux";
// import { CLEAR_ERRORS } from "../../features/product/productSlice";

const ErrorAlert = ({ error }) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const hideErrorFunc = () => {
    console.log(hide);
    if (hide) {
      setHide(false);
    } else {
      setHide(true);
    }
  };
  return (
    <div className={`error_div ${hide && "hideError"}`}>
      {/* <MdErrorOutline /> */}
      <div className="left_error_div">
        <img src={caution} alt="errorImage" className="errorImg" />
        <p>{error}!!</p>
      </div>
      <img
        src={close}
        alt="close"
        className="closeImg"
        onClick={hideErrorFunc}
      />
    </div>
  );
};

export default ErrorAlert;
