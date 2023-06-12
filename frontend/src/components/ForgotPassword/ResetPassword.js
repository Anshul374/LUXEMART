import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loading from "../Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Metadata from "../Metadata/Metadata";
import {
  resetPassword,
  RESET_PSW_CLEAR_ERRORS,
  RESET_PSW_RESET,
} from "../../features/user/resetPasswordSlice";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.resetPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const data = {
      password,
      confirmPassword,
      token,
    };
    dispatch(resetPassword(data));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (error) {
      setTimeout(() => {
        dispatch(RESET_PSW_CLEAR_ERRORS());
      }, 3000);
    }

    if (success) {
      navigate("/account");
      setTimeout(() => {
        dispatch(RESET_PSW_RESET());
      }, 3000);
    }
  }, [dispatch, error, success]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                encType="multiPart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Reset"
                  className="resetPasswordBtn"
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

export default ResetPassword;
