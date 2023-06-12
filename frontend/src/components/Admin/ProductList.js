import React, { useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
// import { Button } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import Metadata from "../Metadata/Metadata";
import {
  ADMIN_PRODUCTS_CLEAR_ERRORS,
  getAdminProducts,
} from "../../features/admin/adminProductsSlice";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import {
  ADMIN_DELETE_PRODUCT_CLEAR_ERRORS,
  ADMIN_DELETE_PRODUCT_RESET,
  adminDeleteProduct,
} from "../../features/admin/adminProductDeleteSlice";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import Loading from "../Loading/Loading";

const ProductList = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.adminProducts);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteProduct);

  const deleteProductHandler = (id) => {
    dispatch(adminDeleteProduct(id));
  };

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (deleteError) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_PRODUCT_CLEAR_ERRORS());
      }, 3000);
    }
    if (deleteSuccess) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_PRODUCT_RESET());
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        dispatch(ADMIN_PRODUCTS_CLEAR_ERRORS());
      }, 3000);
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, deleteSuccess]);

  return (
    <>
      {deleteLoading ? (
        <Loading />
      ) : (
        <>
          <Metadata title={`All Products -- Admin`} />
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">All Products</h1>
              <div className="tableOuterDiv">
                <table className="myOrdersPageTable">
                  <thead>
                    <tr className="tableHeadingRow">
                      <th>Product Id</th>
                      <th>Name</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th style={{ border: "none" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {products &&
                      products.map((item) => (
                        <tr key={item._id} className="tableDataRow">
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.stock}</td>
                          <td>₹{item.price}</td>
                          <td>
                            <Link to={`/admin/product/${item._id}`}>
                              <EditIcon />
                            </Link>
                            <DeleteIcon
                              onClick={() => deleteProductHandler(item._id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {error && <ErrorAlert error={error} />}
          {deleteError && <ErrorAlert error={deleteError} />}
          {deleteSuccess && <SuccessAlert msg="Successfully Deleted" />}
        </>
      )}
    </>
  );
};

export default ProductList;
