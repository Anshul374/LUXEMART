import React, { useState } from "react";
import "./SuccessAlert.css";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CLEAR_LOGOUTM } from "../../features/user/userLogoutSlice";
import { useDispatch } from "react-redux";
import { REGISTER_CLEAR_USER } from "../../features/user/userRegisterSlice";

const SuccessAlert = ({ msg }) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const hideSuccessFunc = () => {
    if (hide) {
      setHide(false);
    } else {
      setHide(true);
      dispatch(CLEAR_LOGOUTM());
      dispatch(REGISTER_CLEAR_USER());
    }
  };
  return (
    <div className={`success_div ${hide && "hideSuccess"}`}>
      <div className="left_success_div">
        <CheckCircleOutlineIcon />
        <p>{msg}!!</p>
      </div>
      <ClearIcon onClick={hideSuccessFunc} sx={{ cursor: "pointer" }} />
    </div>
  );
};

export default SuccessAlert;
