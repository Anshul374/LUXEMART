import React from "react";
import "./Goto_top.css";
import { useState, useEffect } from "react";
import upArrow from "../../Images/up-arrow.png";

export default function Goto_top() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div className={`top_btn ${show && "top_btn_show"}`} onClick={goToBtn}>
      <img src={upArrow} alt="uparrow" />
    </div>
  );
}
