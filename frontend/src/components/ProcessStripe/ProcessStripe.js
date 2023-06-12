import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Routes, Route } from "react-router-dom";
import Payment from "../Payment/Payment";

const ProcessStripe = ({ stripeApiKey }) => {
  return (
    <div>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}
    </div>
  );
};

export default ProcessStripe;
