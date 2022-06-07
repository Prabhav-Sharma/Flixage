import { useUserData } from "../../contexts/providers/UserDataProvider";
import styles from "./ActionButton.module.css";
import { CgPlayListAdd } from "react-icons/cg";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import { useToggle } from "../../hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/providers/AuthProvider";

function PlaylistButton({ video, text = false }) {
  const {
    state: { playlists },
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  const { toggle: modalToggle, setToggle: setModalToggle } = useToggle(false);

  const navigate = useNavigate();
  const location = useLocation();
  const navigateToLogin = () => {
    toast.info("You need to login first!");

    navigate("/login", { state: { from: location } });
  };

  const videoInPlaylists = playlists.some((playlist) =>
    playlist.videos.some((item) => item._id === video._id)
  );

  return (
    <>
      <PlaylistModal show={{ modalToggle, setModalToggle }} video={video} />
      <button
        className={
          videoInPlaylists ? styles.action_btn_active : styles.action_btn
        }
        onClick={(e) => {
          e.stopPropagation();
          if (!token) {
            navigateToLogin();
            return;
          }
          setModalToggle(true);
        }}
      >
        <CgPlayListAdd className={styles.action_icon} />
        {text && "Add to Playlist"}
      </button>
    </>
  );
}

export default PlaylistButton;
