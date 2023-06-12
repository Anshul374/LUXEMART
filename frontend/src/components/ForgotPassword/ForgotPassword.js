import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Metadata from "../Metadata/Metadata";
import {
  forgotPassword,
  FORGOT_PSW_CLEAR_ERRORS,
  FORGOT_PSW_RESET,
} from "../../features/user/forgotPasswordSlice";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (error) {
      setTimeout(() => {
        dispatch(FORGOT_PSW_CLEAR_ERRORS());
      }, 3000);
    }
    if (message) {
      setTimeout(() => {
        dispatch(FORGOT_PSW_RESET());
      }, 3000);
    }
  }, [error, dispatch, message]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
          {message && <SuccessAlert msg={message} />}
          {error && <ErrorAlert error={error} />}
        </>
      )}
    </>
  );
};

export default ForgotPassword;
