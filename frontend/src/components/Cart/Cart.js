import React, { useEffect } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import Metadata from "../Metadata/Metadata";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../features/cart/cartSlice";
import { currentLoginUser } from "../../features/user/currentLoginUserSlice";
import { CARTD_ITEMS_RESET } from "../../features/cart/deleteItemCartSlice";
import PriceBtn from "./PriceBtn";
import EmptyCard from "../EmptyCard/EmptyCard";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, cart, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.currentLoginUser);
  const { loadingD, successD } = useSelector((state) => state.deleteItemCart);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // console.log(isAuthenticated);
    // if (!isAuthenticated) {
    //   navigate("/login");
    // }
    if (successD) {
      dispatch(getCartItems());
      dispatch(CARTD_ITEMS_RESET());
    } else {
      dispatch(getCartItems());
    }
  }, [dispatch, navigate, successD]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : cart.length ? (
        <>
          <Metadata title="CART" />
          {/* {console.log(cart)}; */}
          <div className="cart_main_div">
            <h4>CART</h4>
            <div className="line"></div>
            <div className="cItems_tamount">
              <div className="cItems_div">
                {cart &&
                  cart.map((citem) => (
                    <CartItemCard citem={citem} key={citem.product_id} />
                  ))}
              </div>
              <PriceBtn />
            </div>
          </div>
        </>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default Cart;
