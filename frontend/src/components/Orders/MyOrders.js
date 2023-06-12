import React, { useEffect } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Metadata from "../Metadata/Metadata";
import LaunchIcon from "@mui/icons-material/Launch";
import Loading from "../Loading/Loading";
import { MY_ORDERS_CLEAR_ERRORS } from "../../features/order/myOrdersSlice";
import { getMyOrders } from "../../features/order/myOrdersSlice";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import EmptyOrders from "../EmptyOrders/EmptyOrders";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const { user } = useSelector((state) => state.currentLoginUser);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(MY_ORDERS_CLEAR_ERRORS());
      }, 3000);
    }
    dispatch(getMyOrders());
  }, [error, dispatch]);

  return (
    <>
      <Metadata title={`${user.name} - Orders`} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {orders && orders.length ? (
            <div className="myOrdersPage">
              <h3 className="ordersHeading">{user.name}'s Orders</h3>
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
                            className={
                              item.orderStatus === "Delivered"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {item.orderStatus}
                          </td>
                          <td>{item.orderItems.length}</td>
                          <td>₹{item.totalPrice}</td>
                          <td>
                            <Link to={`/order/${item._id}`}>
                              <LaunchIcon />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <EmptyOrders admin="false" />
          )}
          {error && <ErrorAlert error={error} />}
        </>
      )}
    </>
  );
};

export default MyOrders;
