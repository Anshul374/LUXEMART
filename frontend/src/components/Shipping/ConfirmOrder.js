import React, { useEffect } from "react";
import "./ConfirmOrder.css";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../Metadata/Metadata";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { getCartItems } from "../../features/cart/cartSlice";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.currentLoginUser);
  const { user } = useSelector((state) => state.currentLoginUser);
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.shipping);

  console.log(shippingInfo);
  let subtotal = 0;

  const b =
    cart.length &&
    cart.forEach((item) => {
      subtotal = subtotal + item.quantity * item.price;
    });

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <>
      <Metadata title="Confirm Order" />
      <div className="confirmOrderPage">
        <CheckoutSteps activeStep={1} />
        <div className="innerConfirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Shipping Info</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Name:</p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>
              <div className="confirmCartItemsContainer">
                {cart &&
                  cart.map((item) => (
                    <div key={item.product_id}>
                      <img src={item.images[0].url} alt="Product" />
                      <Link to={`/product/${item.product_id}`}>
                        {item.name}
                      </Link>
                      <span>
                        <span>
                          {item.quantity} X ₹{item.price} =
                        </span>
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* */}
          <div className="orderSummaryMain">
            <div className="orderSummary">
              <Typography>Order Summary</Typography>
              <div>
                <div>
                  <p>Subtotal:</p>
                  <span>₹{subtotal}</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>₹{shippingCharges}</span>
                </div>
                <div>
                  <p>GST:</p>
                  <span>₹{tax}</span>
                </div>
              </div>
              <div className="orderSummaryTotal">
                <p>
                  <b>Total:</b>
                </p>
                <span>₹{totalPrice}</span>
              </div>
              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
