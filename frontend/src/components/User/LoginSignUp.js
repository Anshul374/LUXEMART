import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_CLEAR_ERRORS, login } from "../../features/user/userLoginSlice";
import {
  register,
  REGISTER_CLEAR_ERRORS,
} from "../../features/user/userRegisterSlice";
import {
  CLEAR_ERRORS,
  currentLoginUser,
} from "../../features/user/currentLoginUserSlice";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadingL, isAuthenticatedL, errorL } = useSelector(
    (state) => state.userLogin
  );

  const { loadingR, isAuthenticatedR, errorR, userR } = useSelector(
    (state) => state.userRegister
  );

  const { isAuthenticated } = useSelector((state) => state.currentLoginUser);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [tab, setTab] = useState("login");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ loginEmail, loginPassword }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      email,
      password,
      avatar,
    };
    dispatch(register(userDetails));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const switchTabs = (e, tabm) => {
    if (tabm === "login") {
      setTab("login");
    }
    if (tabm === "register") {
      setTab("register");
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // console.log("anshul");
    if (errorL) {
      setTimeout(() => {
        dispatch(LOGIN_CLEAR_ERRORS());
      }, 3000);
    }
    if (errorR) {
      setTimeout(() => {
        dispatch(REGISTER_CLEAR_ERRORS());
      }, 3000);
    }
    if (isAuthenticatedL) {
      navigate("/account");
    }
    if (isAuthenticated === false) {
      dispatch(currentLoginUser());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, errorL, errorR, navigate, isAuthenticatedL, isAuthenticated]);
  return (
    <>
      {loadingR || loadingL ? (
        <Loading />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button
                  ref={switcherTab}
                  className={`${
                    tab === "login" ? "shiftToNeutarl" : "shiftToRight"
                  }`}
                ></button>
              </div>
              <form
                className={`loginForm ${tab === "login" ? "" : "shiftToLeft"}`}
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className={`signUpForm ${
                  tab === "login" ? "" : "shiftToNeutralForm"
                }`}
                ref={registerTab}
                encType="multiPart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signUpBtn"
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
          {userR.success ? <SuccessAlert msg={userR.message} /> : null}
          {errorL ? (
            <ErrorAlert error={errorL} />
          ) : errorR ? (
            <ErrorAlert error={errorR} />
          ) : null}
        </>
      )}
    </>
  );
};

export default LoginSignUp;
