import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Metadata from "../Metadata/Metadata";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import {
  ADMIN_EDIT_USER_CLEAR_ERRORS,
  adminEditUser,
} from "../../features/admin/adminUserUpdateSlice";
import {
  ADMIN_USER_DETAILS_CLEAR_ERRORS,
  getAdminUserDetails,
} from "../../features/admin/adminUserDetailsSlice";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const AdminUserUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, error } = useSelector(
    (state) => state.adminUserDetails
  );

  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.adminUserUpdate);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (!user || (user && user._id !== id)) {
      dispatch(getAdminUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      setTimeout(() => {
        dispatch(ADMIN_USER_DETAILS_CLEAR_ERRORS());
      }, 3000);
    }
    if (updateError) {
      setTimeout(() => {
        dispatch(ADMIN_EDIT_USER_CLEAR_ERRORS());
      }, 3000);
    }
    if (updateSuccess) {
      navigate("/admin/users");
    }
  }, [updateSuccess, navigate, updateError, dispatch, error, id, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };
    dispatch(adminEditUser({ id, userData }));
  };

  return (
    <>
      <Metadata title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {updateLoading || loading ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
      {updateError && <ErrorAlert error={updateError} />}
      {error && <ErrorAlert error={error} />}
    </>
  );
};

export default AdminUserUpdate;
