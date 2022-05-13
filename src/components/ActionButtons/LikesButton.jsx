import { useUserData } from "../../contexts/providers/UserDataProvider";
import { addToLikes, deleteFromLikes } from "../../services";
import { RiHeartAddLine, RiDislikeLine } from "react-icons/ri";
import styles from "./ActionButton.module.css";
import React from "react";
import { useAuth } from "../../contexts/providers/AuthProvider";

function LikesButton({ video, text = false }) {
  const {
    state: { likes },
    dispatch: userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  return likes.some((item) => item._id === video._id) ? (
    <button
      className={styles.action_btn_active}
      onClick={(e) => {
        e.stopPropagation();
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
        addToLikes({ video: video }, token, userDataDispatch);
      }}
    >
      <RiHeartAddLine className={styles.action_icon} />
      {text && "Like"}
    </button>
  );
}

export default LikesButton;
