import React, { useEffect } from "react";
import "./ProductList.css";
import "./AdminUsersList.css";
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
  ADMIN_DELETE_USER_CLEAR_ERRORS,
  ADMIN_DELETE_USER_RESET,
  adminDeleteUser,
} from "../../features/admin/adminUserDeleteSlice";
import {
  ADMIN_USERS_CLEAR_ERRORS,
  getAdminUsers,
} from "../../features/admin/adminUsersSlice";
import { ADMIN_EDIT_ORDER_RESET } from "../../features/admin/adminOrderEditSlice";
import { ADMIN_EDIT_USER_RESET } from "../../features/admin/adminUserUpdateSlice";

const AdminUsersList = () => {
  const dispatch = useDispatch();
  const { error, loading, users } = useSelector((state) => state.adminUsers);

  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.adminUserDelete);

  const { success: updateSuccess } = useSelector(
    (state) => state.adminUserUpdate
  );
  const deleteUserHandler = (id) => {
    dispatch(adminDeleteUser(id));
  };

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (deleteError) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_USER_CLEAR_ERRORS());
      }, 3000);
    }
    if (updateSuccess) {
      setTimeout(() => {
        dispatch(ADMIN_EDIT_USER_RESET());
      }, 3000);
    }
    if (deleteSuccess) {
      setTimeout(() => {
        dispatch(ADMIN_DELETE_USER_RESET());
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        dispatch(ADMIN_USERS_CLEAR_ERRORS());
      }, 3000);
    }
    dispatch(getAdminUsers());
  }, [dispatch, error, deleteError, deleteSuccess, updateSuccess]);

  return (
    <>
      <Metadata title={`All Users -- Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          {deleteLoading ? (
            <Loading />
          ) : (
            <>
              <h1 id="productListHeading">All Users</h1>
              <div className="tableOuterDiv">
                <table className="myOrdersPageTable">
                  <thead>
                    <tr className="tableHeadingRow">
                      <th>User Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th style={{ border: "none" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {users &&
                      users.map((item) => (
                        <tr key={item._id} className="tableDataRow">
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td
                            className={`${
                              item.role === "admin" ? "greenColor" : "redColor"
                            }`}
                          >
                            {item.role}
                          </td>
                          <td>
                            <Link to={`/admin/user/${item._id}`}>
                              <EditIcon />
                            </Link>
                            <DeleteIcon
                              onClick={() => deleteUserHandler(item._id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      {error && <ErrorAlert error={error} />}
      {deleteError && <ErrorAlert error={deleteError} />}
      {deleteSuccess && <SuccessAlert msg="Successfully Deleted" />}
      {updateSuccess && <SuccessAlert msg="Successfully updated" />}
    </>
  );
};

export default AdminUsersList;
