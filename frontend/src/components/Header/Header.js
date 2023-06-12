import React, { useState } from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../Images/logo.png";
// import websiteLogo from "../../Images/websiteLogo.png";
import websiteLogo2 from "../../Images/websiteLogo2.png";
import profile from "../../Images/profile-user.png";
import search from "../../Images/search (2).png";
import cart from "../../Images/shopping-bag.png";
import hamburger from "../../Images/hamburger.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchHandler = () => {
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  const hamFunc = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  return (
    <>
      <nav className="nav">
        <img
          src={websiteLogo2}
          alt="logo"
          className="logo_img"
          onClick={() => navigate("/")}
        />
        <img
          src={websiteLogo2}
          alt="logo2"
          className="logo_img_m"
          onClick={() => navigate("/")}
        />
        <img
          src={hamburger}
          alt="hamburger"
          className="hamburger"
          onClick={hamFunc}
        />
        <div className={`main_nav ${toggle && "wt"}`}>
          <div className={`main_navl_div ${toggle && "op dis"}`}>
            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            <Link to="/contact">Contact</Link>

            <Link to="/about">About</Link>
          </div>
          <div className={`search-div ${toggle && "op dis"}`}>
            <div className="search-icon-div">
              <img
                src={search}
                alt="search"
                className="search"
                onClick={() => searchHandler(keyword)}
              />
            </div>
            <input
              type="text"
              id="search"
              placeholder="Search for products,brands and more"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className={`main_navr_div ${toggle && "op dis"}`}>
            <div className="cart_div">
              <Link to="/pcart">
                <img src={cart} alt="cart" />
              </Link>
              <p>
                <Link to="/pcart">Cart</Link>
              </p>
            </div>
            <div className="profile_div">
              <Link to="/login">
                <img src={profile} alt="profile" />
              </Link>
              <p>
                <Link to="/login">Profile</Link>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
