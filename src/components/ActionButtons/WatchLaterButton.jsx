import { useUserData } from "../../contexts/providers/UserDataProvider";
import { addToWatchLater, deleteFromWatchLater } from "../../services";
import styles from "./ActionButton.module.css";
import { MdOutlineWatchLater } from "react-icons/md";

const WatchLaterButton = ({ video, text = false }) => {
  const {
    state: { watchlater },
    dispatch: userDataDispatch,
  } = useUserData();

  const token = localStorage.getItem("token");

  return watchlater.some((item) => item._id === video._id) ? (
    <button
      className={styles.action_btn_active}
      onClick={() => deleteFromWatchLater(video._id, token, userDataDispatch)}
    >
      <MdOutlineWatchLater className={styles.action_icon} />
      {text && "Remove from watchlater"}
    </button>
  ) : (
    <button
      className={styles.action_btn}
      onClick={() => addToWatchLater({ video: video }, token, userDataDispatch)}
    >
      <MdOutlineWatchLater className={styles.action_icon} />
      {text && "Add to watchlater"}
    </button>
  );
};

export default WatchLaterButton;
