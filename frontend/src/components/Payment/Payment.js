import React, { useEffect, useRef, useState } from "react";
import "./Payment.css";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../Metadata/Metadata";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { useNavigate } from "react-router-dom";
import {
  ORDER_CLEAR_ERRORS,
  createOrder,
} from "../../features/order/orderSlice";

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [err, setErr] = useState({ toggle: false, emsg: "" });

  const { shippingInfo } = useSelector((state) => state.shipping);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.currentLoginUser);
  const { error } = useSelector((state) => state.newOrder);

  //because stripe receive payment in paise only so we multiply amount with 100

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cart,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const payBtn = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        setErr({ toggle: true, emsg: result.error.message });
        setTimeout(() => {
          setErr({ toggle: false, emsg: "" });
        }, 3000);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          setErr({
            toggle: true,
            emsg: "There's some issue while processing payment",
          });
          setTimeout(() => {
            setErr({ toggle: false, emsg: "" });
          }, 3000);
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      setErr({
        toggle: true,
        emsg: err.response.data.message,
      });
      setTimeout(() => {
        setErr({ toggle: false, emsg: "" });
      }, 3000);
    }
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(ORDER_CLEAR_ERRORS());
      }, 3000);
    }
  }, [dispatch, error]);
  return (
    <>
      <Metadata title="Payment" />
      <div className="paymentContainer">
        <CheckoutSteps activeStep={2} />
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
      {err.toggle && <ErrorAlert error={err.emsg} />}
      {error && <ErrorAlert error={error} />}
    </>
  );
};

export default Payment;
