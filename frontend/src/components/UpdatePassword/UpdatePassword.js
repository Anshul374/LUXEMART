import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAR_ERRORS,
  currentLoginUser,
} from "../../features/user/currentLoginUserSlice";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import Metadata from "../Metadata/Metadata";
import {
  updatePassword,
  UPDATE_PSW_CLEAR_ERRORS,
} from "../../features/user/updatePasswordSlice";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, isPswUpdated } = useSelector(
    (state) => state.updatePassword
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const passwords = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (error) {
      setTimeout(() => {
        dispatch(UPDATE_PSW_CLEAR_ERRORS());
      }, 3000);
    }
    if (isPswUpdated) {
      navigate("/account");
    }
  }, [dispatch, error, isPswUpdated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
              <form
                className="updatePasswordForm"
                encType="multiPart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
          {error && <ErrorAlert error={error} />}
        </>
      )}
    </>
  );
};

export default UpdatePassword;
