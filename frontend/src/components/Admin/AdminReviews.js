import React, { useEffect, useState } from "react";
import "./ProductList.css";
import "./AdminReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import Metadata from "../Metadata/Metadata";
import { Button } from "@mui/material";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import Loading from "../Loading/Loading";
import {
  ADMIN_DELETE_REVIEW_CLEAR_ERRORS,
  ADMIN_DELETE_REVIEW_RESET,
  adminDeleteReview,
} from "../../features/admin/adminDeleteReviewSlice";
import {
  ADMIN_REVIEWS_CLEAR_ERRORS,
  getProductReviews,
} from "../../features/admin/adminProductReviewsSlice";
import StarIcon from "@mui/icons-material/Star";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const { error, reviews, loading } = useSelector(
    (state) => state.adminReviews
  );
  const {
    loading: reviewDelLoading,
    error: reviewDelError,
    success: reviewDelSuccess,
  } = useSelector((state) => state.adminReviewDelete);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(adminDeleteReview({ reviewId, productId }));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (reviewDelError) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_REVIEW_CLEAR_ERRORS());
      }, 3000);
    }
    if (reviewDelSuccess) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_REVIEW_RESET());
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        dispatch(ADMIN_REVIEWS_CLEAR_ERRORS());
      }, 3000);
    }
    if (reviewDelSuccess) {
      dispatch(getProductReviews(productId));
    }
  }, [dispatch, error, reviewDelError, reviewDelSuccess, productId]);

  return (
    <>
      <>
        <Metadata title={`All Reviews -- Admin`} />
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={productReviewsSubmitHandler}
            >
              <h1>All Reviews</h1>
              <div>
                <StarIcon />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }
              >
                Get Reviews
              </Button>
            </form>

            {reviews && reviews.length > 0 ? (
              <div className="tableOuterDiv">
                <table className="myOrdersPageTable">
                  <thead>
                    <tr className="tableHeadingRow">
                      <th>Review Id</th>
                      <th>Name</th>
                      <th>Comment</th>
                      <th>Rating</th>
                      <th style={{ border: "none" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {reviews &&
                      reviews.map((item) => (
                        <tr key={item._id} className="tableDataRow">
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.comment}</td>
                          <td
                            className={`${
                              item.rating >= 3 ? "greenColor" : "redColor"
                            }`}
                          >
                            {item.rating}
                          </td>
                          <td>
                            <DeleteIcon
                              onClick={() => deleteReviewHandler(item._id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </div>
        </div>
        {error && <ErrorAlert error={error} />}
        {reviewDelError && <ErrorAlert error={reviewDelError} />}
        {reviewDelSuccess && <SuccessAlert msg="Successfully Deleted" />}
      </>
    </>
  );
};

export default AdminReviews;
