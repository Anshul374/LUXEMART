import React, { useEffect } from "react";
import "./ProductList.css";
import "./AdminOrderList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";

import Metadata from "../Metadata/Metadata";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import Loading from "../Loading/Loading";
import {
  ADMIN_DELETE_ORDER_CLEAR_ERRORS,
  ADMIN_DELETE_ORDER_RESET,
  adminDeleteOrder,
} from "../../features/admin/adminOrderDeleteSlice";
import {
  ADMIN_ORDERS_CLEAR_ERRORS,
  getAdminOrders,
} from "../../features/admin/adminOrdersSlice";
import EmptyOrders from "../EmptyOrders/EmptyOrders";

const AdminOrderList = () => {
  const dispatch = useDispatch();
  const { error, orders, loading } = useSelector((state) => state.adminOrders);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteOrder);

  const deleteOrderHandler = (id) => {
    dispatch(adminDeleteOrder(id));
  };

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (deleteError) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_ORDER_CLEAR_ERRORS());
      }, 3000);
    }
    if (deleteSuccess) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_ORDER_RESET());
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        dispatch(ADMIN_ORDERS_CLEAR_ERRORS());
      }, 3000);
    }
    dispatch(getAdminOrders());
  }, [dispatch, error, deleteError, deleteSuccess]);

  return (
    <>
      {deleteLoading ? (
        <Loading />
      ) : (
        <>
          <Metadata title={`All Orders -- Admin`} />
          <div className="dashboard">
            <Sidebar />
            {orders && orders.length ? (
              <div className="productListContainer">
                <h1 id="productListHeading">All Orders</h1>
                <div className="tableOuterDiv">
                  <table className="myOrdersPageTable">
                    <thead>
                      <tr className="tableHeadingRow">
                        <th>Order Id</th>
                        <th>Status</th>
                        <th className="qtyHead">Item's Qty</th>
                        <th>Amount</th>
                        <th style={{ border: "none" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {orders &&
                        orders.map((item) => (
                          <tr key={item._id} className="tableDataRow">
                            <td>{item._id}</td>
                            <td
                              className={`${
                                item.orderStatus === "Delivered"
                                  ? "greenColor"
                                  : "redColor"
                              }`}
                            >
                              {item.orderStatus}
                            </td>
                            <td>{item.orderItems.length}</td>
                            <td>₹{item.totalPrice}</td>
                            <td>
                              <Link to={`/admin/order/${item._id}`}>
                                <EditIcon />
                              </Link>
                              <DeleteIcon
                                onClick={() => deleteOrderHandler(item._id)}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyOrders admin="true" />
            )}
          </div>
          {error && <ErrorAlert error={error} />}
          {deleteError && <ErrorAlert error={deleteError} />}
          {deleteSuccess && <SuccessAlert msg="Successfully Deleted" />}
        </>
      )}
    </>
  );
};

export default AdminOrderList;
