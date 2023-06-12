import React, { useState, useEffect } from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItem } from "../../features/cart/deleteItemCartSlice";
import { getCartItems } from "../../features/cart/cartSlice";
import { INC_DEC_RESET, incDecQty } from "../../features/cart/incDecSlice";
import { getTotalAmount } from "../../features/cart/getTotalAmountSlice";

const CartItemCard = ({ citem }) => {
  const dispatch = useDispatch();
  const { loadingI, cartItem, errorI } = useSelector(
    (state) => state.incDecQty
  );
  let qtyC = 1;
  if (citem.quantity > citem.stock) {
    qtyC = citem.stock;
  } else {
    qtyC = citem.quantity;
  }
  const [quantity, setQuantity] = useState(qtyC);

  const increaseQty = () => {
    if (citem.stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
    const pDetails = {
      quantity: qty,
      product_id: citem.product_id,
    };
    dispatch(incDecQty(pDetails));
  };
  const decreaseQty = () => {
    if (quantity === 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
    const pDetails = {
      quantity: qty,
      product_id: citem.product_id,
    };
    dispatch(incDecQty(pDetails));
  };

  const closeFunc = () => {
    // console.log(citem.product_id);
    dispatch(deleteCartItem(citem.product_id));
  };

  useEffect(() => {
    if (cartItem.success) {
      dispatch(getTotalAmount());
      dispatch(INC_DEC_RESET());
    }
  }, [dispatch, cartItem.success]);
  return (
    <div className="cartItemCard">
      <div className="cartItemCard_inner_div">
        <Link to={`/product/${citem.product_id}`}>
          <img
            className="citem_img"
            src={citem.images[0].url}
            alt={citem.name}
          />
        </Link>
        <div className="cItemCard_inner_right">
          <h4>{citem.name}</h4>
          <p className="desc_p">{citem.description}</p>
          <div className="qty_div">
            <h4>Qty:</h4>
            <div>
              <button onClick={decreaseQty}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={increaseQty}>+</button>
            </div>
          </div>
          <div className="ratings_div">
            <p>{citem.ratings}</p>
            <StarIcon />
          </div>
          <p className="price_div">₹{quantity * citem.price}</p>
        </div>
        <CloseIcon onClick={closeFunc} />
      </div>
    </div>
  );
};

export default CartItemCard;
