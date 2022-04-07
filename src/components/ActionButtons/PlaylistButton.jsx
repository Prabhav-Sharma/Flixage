import { useUserData } from "../../contexts/providers/UserDataProvider";
import styles from "./ActionButton.module.css";
import { CgPlayListAdd } from "react-icons/cg";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import { useToggle } from "../../hooks";

function PlaylistButton({ video, text = false }) {
  const {
    state: { playlists },
  } = useUserData();

  const { toggle: modalToggle, setToggle: setModalToggle } = useToggle(false);

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
        onClick={() => setModalToggle(true)}
      >
        <CgPlayListAdd className={styles.action_icon} />
        {text && "Add to Playlist"}
      </button>
    </>
  );
}

export default PlaylistButton;
