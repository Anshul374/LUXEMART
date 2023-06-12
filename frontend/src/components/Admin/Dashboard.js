import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../features/admin/adminProductsSlice";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import {
  ADMIN_CREATE_PRODUCT_CLEAR_ERRORS,
  ADMIN_CREATE_PRODUCT_RESET,
} from "../../features/admin/createProductSlice";
import { ADMIN_EDIT_PRODUCT_RESET } from "../../features/admin/adminProductEditSlice";
import { getAdminOrders } from "../../features/admin/adminOrdersSlice";
import { getAdminUsers } from "../../features/admin/adminUsersSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  const { success } = useSelector((state) => state.createProduct);
  const { orders, error, totalAmount } = useSelector(
    (state) => state.adminOrders
  );
  const { users } = useSelector((state) => state.adminUsers);
  const { success: updateSuccess } = useSelector(
    (state) => state.updateProduct
  );
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  const productsAvailable = products.length - outOfStock;

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (success) {
      setTimeout(() => {
        dispatch(ADMIN_CREATE_PRODUCT_RESET());
      }, 3000);
    }
    if (updateSuccess) {
      setTimeout(() => {
        dispatch(ADMIN_EDIT_PRODUCT_RESET());
      }, 3000);
    }
    dispatch(getAdminProducts());
    dispatch(getAdminOrders());
    dispatch(getAdminUsers());
  }, [dispatch, success]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const options = {
    responsive: true,
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, productsAvailable],
      },
    ],
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                TotalAmount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders ? orders.length : 0}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users ? users.length : 0}</p>
              </Link>
            </div>
          </div>
          {/* <h1>Anshul</h1> */}
          <div className="lineChart disp">
            {products && <Line data={lineState} options={options} />}
          </div>
          <div className="doughnutChart disp">
            {products && <Doughnut data={doughnutState} options={options} />}
          </div>
          {window.innerWidth < 600
            ? products && <Line data={lineState} options={options} />
            : null}
          {window.innerWidth < 600
            ? products && <Doughnut data={doughnutState} options={options} />
            : null}
        </div>
      </div>
      {success && <SuccessAlert msg="Product SuccessFully Created" />}
      {updateSuccess && <SuccessAlert msg="Product Updated Successfully" />}
    </>
  );
};

export default Dashboard;
