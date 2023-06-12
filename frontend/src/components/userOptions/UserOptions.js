import React, { useState, useEffect } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import { logout, CLEAR_LOGOUTM } from "../../features/user/userLogoutSlice";
import { useSelector, useDispatch } from "react-redux";
import { currentLoginUser } from "../../features/user/currentLoginUserSlice";
import { LOGIN_RESET } from "../../features/user/userLoginSlice";

const UserOptions = ({ user }) => {
  const { logoutm } = useSelector((state) => state.userLogout);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cart.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cart.length})`,
      func: cartu,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders/me");
  }
  function account() {
    navigate("/account");
  }
  function cartu() {
    navigate("/cart");
  }
  useEffect(() => {
    if (logoutm.success === true) {
      dispatch(currentLoginUser());
      dispatch(LOGIN_RESET());
      setTimeout(() => {
        dispatch(CLEAR_LOGOUTM());
      }, 3000);
      navigate("/");
    }
  }, [logoutm.success, dispatch, navigate]);

  function logoutUser() {
    dispatch(logout());
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        // sx={{ position: "absolute", bottom: 16, right: 16 }}
        // sx={{ width: "1vmax" }}
        open={open}
        className="speedDial"
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => {
          return (
            <SpeedDialAction
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              key={item.name}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          );
        })}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
