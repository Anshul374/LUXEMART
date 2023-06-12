import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/product/productSlice";
import productDetailsReducer from "../features/product/productDetailsSlice";
import homeProductsReducer from "../features/product/homeProductsSlice";
import userLoginReducer from "../features/user/userLoginSlice";
import userRegisterReducer from "../features/user/userRegisterSlice";
import currentLoginUserReducer from "../features/user/currentLoginUserSlice";
import userLogoutReducer from "../features/user/userLogoutSlice";
import updateProfileReducer from "../features/user/updateProfileSlice";
import UpdatePasswordReducer from "../features/user/updatePasswordSlice";
import forgotPasswordReducer from "../features/user/forgotPasswordSlice";
import resetPasswordReducer from "../features/user/resetPasswordSlice";
import addToCartReducer from "../features/cart/addToCartSlice";
import getCartItemsReducer from "../features/cart/cartSlice";
import deleteItemCartReducer from "../features/cart/deleteItemCartSlice";
import incDecQtyReducer from "../features/cart/incDecSlice";
import getTotalAmtReducer from "../features/cart/getTotalAmountSlice";
import shippingInfoReducer from "../features/shipping/shippingSlice";
import newOrderReducer from "../features/order/orderSlice";
import myOrdersReducer from "../features/order/myOrdersSlice";
import orderDetailsReducer from "../features/order/orderDetailsSlice";
import newReviewReducer from "../features/reviews/newReviewSlice";
import adminProductsReducer from "../features/admin/adminProductsSlice";
import createProductReducer from "../features/admin/createProductSlice";
import adminDeleteProductReducer from "../features/admin/adminProductDeleteSlice";
import updateProductReducer from "../features/admin/adminProductEditSlice";
import adminOrdersReducer from "../features/admin/adminOrdersSlice";
import updateOrderReducer from "../features/admin/adminOrderEditSlice";
import adminDeleteOrderReducer from "../features/admin/adminOrderDeleteSlice";
import adminUsersReducer from "../features/admin/adminUsersSlice";
import adminUserDetailsReducer from "../features/admin/adminUserDetailsSlice";
import adminUserUpdateReducer from "../features/admin/adminUserUpdateSlice";
import adminUserDeleteReducer from "../features/admin/adminUserDeleteSlice";
import adminReviewsReducer from "../features/admin/adminProductReviewsSlice";
import adminReviewDeleteReducer from "../features/admin/adminDeleteReviewSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    homeProducts: homeProductsReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userLogout: userLogoutReducer,
    currentLoginUser: currentLoginUserReducer,
    updateProfile: updateProfileReducer,
    updatePassword: UpdatePasswordReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    addToCart: addToCartReducer,
    cart: getCartItemsReducer,
    deleteItemCart: deleteItemCartReducer,
    incDecQty: incDecQtyReducer,
    getTotalAmt: getTotalAmtReducer,
    shipping: shippingInfoReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    adminProducts: adminProductsReducer,
    createProduct: createProductReducer,
    deleteProduct: adminDeleteProductReducer,
    updateProduct: updateProductReducer,
    adminOrders: adminOrdersReducer,
    updateOrder: updateOrderReducer,
    deleteOrder: adminDeleteOrderReducer,
    adminUsers: adminUsersReducer,
    adminUserDetails: adminUserDetailsReducer,
    adminUserUpdate: adminUserUpdateReducer,
    adminUserDelete: adminUserDeleteReducer,
    adminReviews: adminReviewsReducer,
    adminReviewDelete: adminReviewDeleteReducer,
  },
});
