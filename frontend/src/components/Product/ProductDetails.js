import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../../features/product/productDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
// import Carousel from "react-material-ui-carousel";
import Carousel from "../CarouselProduct/Carousel";
import "./ProductDetails.css";
import ReviewCard from "../ReviewCard/ReviewCard.js";
import Loading from "../Loading/Loading";
import Metadata from "../Metadata/Metadata";
import {
  CART_CLEAR_ERRORS,
  CART_RESET,
  addToCart,
} from "../../features/cart/addToCartSlice";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import { getCartItems } from "../../features/cart/cartSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import {
  NEW_REVIEW_CLEAR_ERRORS,
  NEW_REVIEW_RESET,
  createNewReview,
} from "../../features/reviews/newReviewSlice";

const ProductDetails = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const { loadingC, cartM, errorC } = useSelector((state) => state.addToCart);
  const { loadingRe, successRe, errorRe } = useSelector(
    (state) => state.newReview
  );

  const {
    _id,
    name,
    description,
    price,
    images,
    category,
    stock,
    numOfReviews,
    reviews,
    ratings,
  } = product;

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addCartFunc = () => {
    const pDetails = {
      product_id: _id,
      name,
      description,
      price,
      images,
      category,
      stock,
      numOfReviews,
      reviews,
      ratings,
      quantity,
    };
    dispatch(addToCart(pDetails));
  };

  const submitReviewToggle = (e) => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const reviewData = {
      rating,
      comment,
      productId: id,
    };
    dispatch(createNewReview(reviewData));
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (errorRe) {
      setTimeout(() => {
        dispatch(NEW_REVIEW_CLEAR_ERRORS());
      }, 3000);
    }
    if (cartM) {
      dispatch(getCartItems());
    }
    if (errorC) {
      setTimeout(() => {
        dispatch(CART_CLEAR_ERRORS());
      }, 3000);
    }

    if ((!cartM && !product) || id !== product._id || successRe) {
      dispatch(fetchProductDetails(id));
    }
    if (cartM) {
      setTimeout(() => {
        dispatch(CART_RESET());
      }, 3000);
    }
    if (successRe) {
      setTimeout(() => {
        dispatch(NEW_REVIEW_RESET());
      }, 3000);
    }
  }, [dispatch, id, cartM, errorC, successRe, errorRe]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    acctiveColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div className="carousel_img_div">
              {product.images && (
                <Carousel
                  slides={product.images}
                  autoSlide={true}
                  autoSlideInterval={3000}
                />
              )}
            </div>
            <div className="details_div">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addCartFunc}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status :{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
                precision={0.5}
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} sx={{ color: "tomato" }}>
                Cancel
              </Button>
              <Button
                sx={{ color: "rgb(89, 120, 223)" }}
                onClick={reviewSubmitHandler}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => {
                  return <ReviewCard review={review} key={review._id} />;
                })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
      {cartM && <SuccessAlert msg={cartM.message} />}
      {successRe && <SuccessAlert msg="Review Submitted Successfully" />}
      {errorC && <ErrorAlert error={errorC} />}
      {errorRe && <ErrorAlert error={errorRe} />}
    </>
  );
};

export default ProductDetails;
