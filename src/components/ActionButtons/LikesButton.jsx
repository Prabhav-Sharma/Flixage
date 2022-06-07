import { useUserData } from "../../contexts/providers/UserDataProvider";
import { addToLikes, deleteFromLikes } from "../../services";
import { RiHeartAddLine, RiDislikeLine } from "react-icons/ri";
import styles from "./ActionButton.module.css";
import React from "react";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LikesButton({ video, text = false }) {
  const {
    state: { likes },
    dispatch: userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const navigateToLogin = () => {
    toast.info("You need to login first!");

    navigate("/login", { state: { from: location } });
  };

  return likes.some((item) => item._id === video._id) ? (
    <button
      className={styles.action_btn_active}
      onClick={(e) => {
        e.stopPropagation();
        if (!token) {
          navigateToLogin();
          return;
        }
        deleteFromLikes(video._id, token, userDataDispatch);
      }}
    >
      <RiDislikeLine className={styles.action_icon} />
      {text && "Unlike"}
    </button>
  ) : (
    <button
      className={styles.action_btn}
      onClick={(e) => {
        e.stopPropagation();
        if (!token) {
          navigateToLogin();
          return;
        }
        addToLikes({ video: video }, token, userDataDispatch);
      }}
    >
      <RiHeartAddLine className={styles.action_icon} />
      {text && "Like"}
    </button>
  );
}

export default LikesButton;
