import React, { useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import {
  ORDER_DETAILS_CLEAR_ERRORS,
  getOrderDetails,
} from "../../features/order/orderDetailsSlice";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Metadata from "../Metadata/Metadata";

const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { error, loading, orderDetail } = useSelector(
    (state) => state.orderDetails
  );

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(ORDER_DETAILS_CLEAR_ERRORS());
      }, 3000);
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1>Order #{orderDetail && orderDetail._id}</h1>
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
        </>
      )}
    </>
  );
};

export default OrderDetails;
