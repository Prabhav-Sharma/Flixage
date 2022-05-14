import { useUserData } from "../../contexts/providers/UserDataProvider";
import { addToWatchLater, deleteFromWatchLater } from "../../services";
import styles from "./ActionButton.module.css";
import { MdOutlineWatchLater } from "react-icons/md";
import { useAuth } from "../../contexts/providers/AuthProvider";

const WatchLaterButton = ({ video, text = false }) => {
  const {
    state: { watchlater },
    dispatch: userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  return watchlater.some((item) => item._id === video._id) ? (
    <button
      className={styles.action_btn_active}
      onClick={(e) => {
        e.stopPropagation();
        deleteFromWatchLater(video._id, token, userDataDispatch);
      }}
    >
      <MdOutlineWatchLater className={styles.action_icon} />
      {text && "Remove from watchlater"}
    </button>
  ) : (
    <button
      className={styles.action_btn}
      onClick={(e) => {
        e.stopPropagation();
        addToWatchLater({ video: video }, token, userDataDispatch);
      }}
    >
      <MdOutlineWatchLater className={styles.action_icon} />
      {text && "Add to watchlater"}
    </button>
  );
};

export default WatchLaterButton;
