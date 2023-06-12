import React, { useEffect } from "react";
import "./Profile.css";
import Metadata from "../Metadata/Metadata";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentLoginUser } from "../../features/user/currentLoginUserSlice";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import { UPDATE_PROFILE_RESET } from "../../features/user/updateProfileSlice";
import { UPDATE_PSW_RESET } from "../../features/user/updatePasswordSlice";
import { RESET_PSW_RESET } from "../../features/user/resetPasswordSlice";
import { getCartItems } from "../../features/cart/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.currentLoginUser
  );
  const { isUpdated } = useSelector((state) => state.updateProfile);
  const { isPswUpdated } = useSelector((state) => state.updatePassword);
  const { success } = useSelector((state) => state.resetPassword);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (isAuthenticated === false) {
      dispatch(currentLoginUser());
    }
    if (isAuthenticated) {
      dispatch(getCartItems());
    }
    if (isUpdated.success) {
      setTimeout(() => {
        dispatch(UPDATE_PROFILE_RESET());
      }, 3000);
    }
    if (isPswUpdated) {
      setTimeout(() => {
        dispatch(UPDATE_PSW_RESET());
      }, 3000);
    }
    if (success) {
      setTimeout(() => {
        dispatch(RESET_PSW_RESET());
      }, 3000);
    }
  }, [dispatch, isUpdated.success, success, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <>
            {isAuthenticated && (
              <>
                <Metadata title={`${user.name}'s Profile`} />
                <div className="profileContainer">
                  <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link to="/me/update">Edit Profile</Link>
                  </div>
                  <div>
                    <div>
                      <h4>Full Name</h4>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h4>Joined On</h4>
                      <p>{String(user.createdAt).substring(0, 10)}</p>
                    </div>
                    <div>
                      <Link to="/orders/me">My Orders</Link>
                      <Link to="/password/update">Change Password</Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
          {success && <SuccessAlert msg="Successfully Updated" />}
          {isPswUpdated && <SuccessAlert msg="Successfully Updated" />}
          {isUpdated.success && <SuccessAlert msg={isUpdated.message} />}
        </>
      )}
    </>
  );
};

export default Profile;
