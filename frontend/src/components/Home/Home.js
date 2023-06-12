import React, { useEffect, useState } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import Metadata from "../Metadata/Metadata";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAR_ERRORS,
  fetchHomeProducts,
} from "../../features/product/homeProductsSlice";
import Loading from "../Loading/Loading";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import CarouselHome from "../CarouselHome/CarouselHome";

const product = {
  name: "Blue Tshirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "3000",
  _id: "112",
};
const Home = () => {
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.homeProducts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (error) {
      setTimeout(() => {
        dispatch(CLEAR_ERRORS());
      }, 3000);
    }
    dispatch(fetchHomeProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="ECOMMERCE" />
          {/* <div className="cover_div">
            <h1>
              Welcome to <strong>LUXEMART</strong>
            </h1>
            <p>FIND AMAZING PRODUCTS BELOW</p>
            <a href="#home_heading">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div> */}
          <CarouselHome autoSlide={true} autoSlideInterval={3000} />
          <h2 className="home_heading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((prod) => {
                return <Product key={prod._id} product={prod} />;
              })}
          </div>
          {error ? <ErrorAlert error={error} /> : null}
        </>
      )}
    </>
  );
};
export default Home;
