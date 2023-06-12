import React, { useState, useEffect } from "react";
import "./UpdateOrder.css";
import Metadata from "../Metadata/Metadata";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../features/order/orderDetailsSlice";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Loading from "../Loading/Loading";
import {
  ADMIN_EDIT_ORDER_CLEAR_ERRORS,
  ADMIN_EDIT_ORDER_RESET,
  adminEditOrder,
} from "../../features/admin/adminOrderEditSlice";
import { ORDER_DETAILS_CLEAR_ERRORS } from "../../features/order/orderDetailsSlice";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";

const UpdateOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, orderDetail, error } = useSelector(
    (state) => state.orderDetails
  );
  const {
    loading: orderUpdateLoading,
    success: editSuccess,
    error: editError,
  } = useSelector((state) => state.updateOrder);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      status,
    };
    dispatch(adminEditOrder({ id, formData }));
  };

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (error) {
      setTimeout(() => {
        dispatch(ORDER_DETAILS_CLEAR_ERRORS());
      }, 3000);
    }
    if (editError) {
      setTimeout(() => {
        dispatch(ADMIN_EDIT_ORDER_CLEAR_ERRORS());
      }, 3000);
    }
    if (editSuccess) {
      setTimeout(() => {
        dispatch(ADMIN_EDIT_ORDER_RESET());
      }, 3000);
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, editSuccess, editError, error, id]);
  return (
    <>
      <Metadata title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        {orderUpdateLoading ? (
          <Loading />
        ) : (
          <div className="orderDetailsMainDiv">
            <div className="orderDetailsDiv">
              <div className="orderDetailsContainer">
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{orderDetail.user && orderDetail.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {orderDetail.shippingInfo &&
                        orderDetail.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {orderDetail.shippingInfo &&
                        `${orderDetail.shippingInfo.address},${orderDetail.shippingInfo.city},${orderDetail.shippingInfo.state},${orderDetail.shippingInfo.pinCode},${orderDetail.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        orderDetail.paymentInfo &&
                        orderDetail.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {orderDetail.paymentInfo &&
                      orderDetail.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div>
                    <p>Amount :</p>
                    <span>
                      ₹{orderDetail.totalPrice && orderDetail.totalPrice}
                    </span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        orderDetail.orderStatus &&
                        orderDetail.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {orderDetail.orderStatus && orderDetail.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {orderDetail.orderItems &&
                    orderDetail.orderItems.map((item) => (
                      <div key={item.product_id}>
                        <img src={item.images[0].url} alt="Product" />

                        <Link to={`/product/${item.product_id}`}>
                          {item.name}
                        </Link>
                        <span>
                          <span>
                            {item.quantity} X ₹{item.price}=
                          </span>
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div
              className="newProductContainer"
              style={{
                display:
                  orderDetail.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="createProductForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {/* {console.log(orderDetail.orderStatus)} */}
                    {orderDetail.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {orderDetail.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
      {error && <ErrorAlert error={error} />}
      {editError && <ErrorAlert error={editError} />}
      {editSuccess && <SuccessAlert msg="Successfully Updated Order" />}
    </>
  );
};

export default UpdateOrder;
