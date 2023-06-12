import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import {
  CLEAR_ERRORS,
  fetchProducts,
} from "../../features/product/productSlice";
import Product from "../Home/Product";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import useMediaQuery from "@mui/material/useMediaQuery";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Metadata from "../Metadata/Metadata";

const Products = () => {
  const navigate = useNavigate();

  const showSlider = useMediaQuery("(max-width:800px)");

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const [target, setTarget] = useState("");

  const { keyword } = useParams();

  const [ratings, setRatings] = useState(0);

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState([0, 300000]);

  const [currentPage, setCurrentPage] = useState(1);

  // console.log(keyword, ratings, category, price[0], price[1], currentPage);

  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
    error,
  } = useSelector((state) => state.products);
  // console.log("filtered", filteredProductCount);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setPrice(newValue);
    console.log(newValue);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    console.log(e);
  };

  const clearFunc = () => {
    setTarget("");
    setPrice([0, 300000]);
    setRatings(0);
    setCategory("");
    setCurrentPage(1);
    navigate("/products");
  };
  console.log(products);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (error) {
      setTimeout(() => {
        dispatch(CLEAR_ERRORS());
      }, 3000);
    }
    if (currentPage >= 2) {
      if (
        keyword ||
        price[0] !== 0 ||
        price[1] !== 300000 ||
        category ||
        ratings
      ) {
        console.log("products length", products.length);
        console.log(currentPage);
        if (products.length > 0) {
          setCurrentPage(currentPage);
        } else {
          setCurrentPage(1);
        }
      }
    }
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  }, [
    dispatch,
    error,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    products.length,
  ]);

  let count = filteredProductCount;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="filter_products_div">
            <div className="products">
              {products.length ? (
                products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })
              ) : (
                <h2 className="noResult">
                  YOUR SEARCH DID NOT YIELD ANY RESULTS.
                </h2>
              )}
            </div>
            <div className="blank_div"></div>
            <div className="filterBox">
              <p>Price</p>
              <Box sx={{ marginLeft: "0.4vmax" }}>
                {showSlider ? (
                  <Slider
                    sx={{ color: "tomato", width: "16vmax" }}
                    size="small"
                    getAriaLabel={() => "Temperature range"}
                    value={price}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    min={0}
                    max={300000}
                  />
                ) : (
                  <Slider
                    sx={{ color: "tomato", width: "9vmax" }}
                    size="small"
                    getAriaLabel={() => "Temperature range"}
                    value={price}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={300000}
                  />
                )}
              </Box>
              <p className="categoryHeading">Categories</p>
              <ul className="categoryBox">
                {/* {console.log(target, category)} */}
                {categories.map((category) => {
                  return (
                    <li
                      className={`category-list ${
                        target === category && "tomatoc"
                      }`}
                      key={category}
                      onClick={(e) => {
                        setTarget(e.target.innerText);
                        setCategory(category.toLowerCase());
                      }}
                    >
                      {category}
                    </li>
                  );
                })}
              </ul>
              <fieldset>
                <legend>Ratings Above</legend>
                {showSlider ? (
                  <Slider
                    sx={{ width: "16vmax", color: "tomato" }}
                    size="small"
                    value={ratings}
                    defaultValue={70}
                    aria-label="Small"
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    valueLabelDisplay="on"
                    min={0}
                    max={5}
                  />
                ) : (
                  <Slider
                    sx={{ width: "8vmax", color: "tomato" }}
                    size="small"
                    value={ratings}
                    defaultValue={70}
                    aria-label="Small"
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                )}
              </fieldset>
              <button className="clearBtn" onClick={() => clearFunc()}>
                Clear
              </button>
            </div>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
          {error && <ErrorAlert error={error} />}
        </>
      )}
    </>
  );
};

export default Products;
