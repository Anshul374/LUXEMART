import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Products/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import { currentLoginUser } from "./features/user/currentLoginUserSlice";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from "./components/userOptions/UserOptions";
import SuccessAlert from "./components/SuccessAlert/SuccessAlert";
import Profile from "./components/Profile/Profile.js";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import { LOGIN_CLEAR_ERRORS } from "./features/user/userLoginSlice";
import Cart from "./components/Cart/Cart";
import { ProtectedCart } from "./components/Protected/ProtectedCart";
import Shipping from "./components/Shipping/Shipping";
import { getCartItems } from "./features/cart/cartSlice";
import ConfirmOrder from "./components/Shipping/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Payment/Payment";

//to use input elements that we import from stipe npm package
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/OrderDetails/OrderDetails";
// import Carousel from "./components/Carousel1/Carousel";
import Dashboard from "./components/Admin/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import AdminOrderList from "./components/Admin/AdminOrderList";
import UpdateOrder from "./components/Admin/UpdateOrder";
// import EmptyOrders from "./components/EmptyOrders/EmptyOrders";
import AdminUsersList from "./components/Admin/AdminUsersList";
import AdminUserUpdate from "./components/Admin/AdminUserUpdate";
import AdminReviews from "./components/Admin/AdminReviews";
// import NoPageFound from "./components/NoPageFound/NoPageFound";
import AboutMe from "./components/AboutMe/AboutMe";
// import ProcessStripe from "./components/ProcessStripe/ProcessStripe";
import ContactMe from "./components/ContactMe/ContactMe";
// import { CLEAR_LOGOUTM } from "./features/user/userLogoutSlice";
// import { fetchProducts } from "./features/product/productSlice";
import GoToTop from "./components/GoToTop/GoToTop";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  const { products, filteredProductCount } = useSelector(
    (state) => state.products
  );

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  const { logoutm } = useSelector((state) => state.userLogout);
  const { isAuthenticatedL, userL } = useSelector((state) => state.userLogin);
  const { isAuthenticated, user, error } = useSelector(
    (state) => state.currentLoginUser
  );
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(LOGIN_CLEAR_ERRORS());
      }, 3000);
    }

    if (isAuthenticated === false) {
      dispatch(currentLoginUser());
      dispatch(getCartItems());
    }

    if (isAuthenticated) {
      getStripeApiKey();
    }
  }, [dispatch, error, isAuthenticated]);
  return (
    <>
      <Header />
      {isAuthenticated ? (
        <UserOptions user={user} />
      ) : isAuthenticatedL ? (
        <UserOptions user={userL} />
      ) : null}
      {logoutm.success && <SuccessAlert msg={logoutm.message} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="products/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route
          path="/products/:keyword/product/:id"
          element={<ProductDetails />}
        />
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/pcart"
          element={<ProtectedCart isAuthenticated={isAuthenticated} />}
        />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders/me" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<AdminOrderList />} />
        <Route path="/admin/order/:id" element={<UpdateOrder />} />
        <Route path="/admin/users" element={<AdminUsersList />} />
        <Route path="/admin/user/:id" element={<AdminUserUpdate />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/contact" element={<ContactMe />} />
        {/* <Route path="*" element={<NoPageFound />} /> */}
      </Routes>

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}
      <GoToTop />
      <Footer />
    </>
  );
}

export default App;
