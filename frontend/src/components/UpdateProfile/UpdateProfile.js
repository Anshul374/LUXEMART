import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAR_ERRORS,
  currentLoginUser,
} from "../../features/user/currentLoginUserSlice";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import Metadata from "../Metadata/Metadata";
import {
  updateUser,
  UPDATE_USER_CLEAR_ERRORS,
  UPDATE_PROFILE_RESET,
} from "../../features/user/updateProfileSlice";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state) => state.currentLoginUser
  );
  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateProfile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      avatar,
    };
    dispatch(updateUser(userData));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (isAuthenticated) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      setTimeout(() => {
        dispatch(UPDATE_USER_CLEAR_ERRORS());
      }, 3000);
    }
    if (isUpdated.success) {
      dispatch(currentLoginUser());
      navigate("/account");
    }
  }, [user, error, isUpdated.success, dispatch, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multiPart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
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

export default UpdateProfile;
