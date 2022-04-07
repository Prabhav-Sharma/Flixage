import { useUserData } from "../../contexts/providers/UserDataProvider";
import { addToLikes, deleteFromLikes } from "../../services";
import { RiHeartAddLine, RiDislikeLine } from "react-icons/ri";
import styles from "./ActionButton.module.css";
import React from "react";

function LikesButton({ video, text = false }) {
  const {
    state: { likes },
    dispatch: userDataDispatch,
  } = useUserData();

  const token = localStorage.getItem("token");

  return likes.some((item) => item._id === video._id) ? (
    <button
      className={styles.action_btn_active}
      onClick={() => deleteFromLikes(video._id, token, userDataDispatch)}
    >
      <RiDislikeLine className={styles.action_icon} />
      {text && "Unlike"}
    </button>
  ) : (
    <button
      className={styles.action_btn}
      onClick={() => addToLikes({ video: video }, token, userDataDispatch)}
    >
      <RiHeartAddLine className={styles.action_icon} />
      {text && "Like"}
    </button>
  );
}

export default LikesButton;
