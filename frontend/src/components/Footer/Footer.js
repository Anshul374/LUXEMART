import React from "react";
import "./Footer.css";
import appStore from "../../Images/Appstore.png";
import playStore from "../../Images/playstore.png";

const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        {/* <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p> */}
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" style={{ marginBottom: "0" }} />
      </div>
      <div className="midFooter">
        <h1>LUXEMART</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; anshulthakur</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/anshul374/">Instagram</a>
        <a href="https://www.facebook.com/anshul.thakur.56829">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
