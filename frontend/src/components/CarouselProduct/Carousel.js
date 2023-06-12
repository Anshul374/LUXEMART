import React, { useEffect, useState } from "react";
import "./Carousel.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Carousel = ({ slides, autoSlide, autoSlideInterval }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  //   console.log(slides);

  // useEffect(() => {
  //   if (!autoSlide) {
  //     return;
  //   }
  //   const slideInterval = setInterval(next, autoSlideInterval);
  //   return () => clearInterval(slideInterval);
  // }, []);
  return (
    <div className="carousel_main_div">
      <div className="carousel_inner_div">
        <div
          className="imgDiv"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((s) => (
            <>
              <img src={s.url} alt="img" key={s._id} />
            </>
          ))}
        </div>
        <div className="leftRightBtnDiv">
          <button onClick={prev}>
            <KeyboardArrowLeftIcon />
          </button>
          <button onClick={next}>
            <KeyboardArrowRightIcon />
          </button>
        </div>
        <div className="indicatorsDiv">
          <div className="indicatorsInnerDiv">
            {slides.map((_, i) => (
              <div
                className={`indicator ${curr === i ? "pd" : "opt"}`}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
