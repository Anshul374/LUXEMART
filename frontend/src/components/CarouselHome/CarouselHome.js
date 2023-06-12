import React, { useState, useEffect } from "react";
import "./CarouselHome.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { slides } from "./Items";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const CarouselHome = ({ autoSlide, autoSlideInterval }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [curr, setCurr] = useState(0);

  const categoryFunc = (e) => {
    const keyword = "";
    const currentPage = 1;
    const price = [0, 300000];
    const ratings = 0;

    console.log(e.target.innerText.toLowerCase());
    const category = e.target.innerText.toLowerCase();
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
    navigate("/products");
  };

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  //   console.log(slides);

  useEffect(() => {
    if (!autoSlide) {
      return;
    }
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="carousel_main_divH">
      <div className="carousel_inner_divH">
        <div
          className="imgDivH"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((s) => (
            <div key={s.category}>
              <img src={s.image} alt="img" />
              <h2 onClick={(e) => categoryFunc(e)}>{s.category}</h2>
            </div>
          ))}
        </div>
        <div className="leftRightBtnDivH">
          <button onClick={prev}>
            <KeyboardArrowLeftIcon />
          </button>
          <button onClick={next}>
            <KeyboardArrowRightIcon />
          </button>
        </div>
        <div className="indicatorsDivH">
          <div className="indicatorsInnerDivH">
            {slides.map((_, i) => (
              <div className={`indicatorH ${curr === i ? "pd" : "opt"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselHome;
