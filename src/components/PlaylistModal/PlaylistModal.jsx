import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./PlaylistModal.module.css";
import { useUserData } from "../../contexts/providers/UserDataProvider";
import { addPlaylist, addToPlaylist, removeFromPlaylist } from "../../services";
import { AiOutlineFileAdd, AiOutlineCloseCircle } from "react-icons/ai";
import { TextInput } from "../index";
import { useAuth } from "../../contexts/providers/AuthProvider";

function PlaylistModal({ show, video }) {
  const { modalToggle, setModalToggle } = show;

  if (!modalToggle) return null;

  const {
    state: { playlists },
    dispatch: userDataDispatch,
  } = useUserData();

  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");

  const {
    authState: { token },
  } = useAuth();

  const PlayListItem = ({ playlist, id }) => {
    const itemInPlaylist = playlist.videos.some((item) => item._id === id);

    const removeFromPlaylistHandler = async () => {
      await removeFromPlaylist(playlist._id, id, token, userDataDispatch);
      setTimeout(() => setModalToggle(false), 300);
    };

    const addToPlaylistHandler = async () => {
      await addToPlaylist(
        playlist._id,
        { video: video },
        token,
        userDataDispatch
      );
      setTimeout(() => setModalToggle(false), 300);
    };

    return (
      <label>
        <input
          type="checkbox"
          checked={itemInPlaylist}
          onChange={() =>
            itemInPlaylist
              ? removeFromPlaylistHandler()
              : addToPlaylistHandler()
          }
        />
        {playlist.title}
      </label>
    );
  };

  const addNewPlaylistHandler = async () => {
    const newTitle = newPlaylistTitle.trim();

    if (
      playlists.some((p) => p.title.toLowerCase() === newTitle.toLowerCase())
    ) {
      alert(`Playlist with the name '${newTitle}' already exists`);
      return;
    }

    if (newTitle.length === 0) {
      alert("Playlist title can't be empty!");
      return;
    }

    await addPlaylist({ title: newTitle }, token, userDataDispatch);
    setNewPlaylistTitle("");
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={() => setModalToggle(false)}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modal_header}>Add to Playlist</h2>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist._id} className={styles.playlist_item}>
              <PlayListItem playlist={playlist} id={video._id} />
            </li>
          ))}
        </ul>

        <span className={`${styles.input_wrapper} flex-row`}>
          <TextInput
            legend="Create New Playlist"
            placeholder="Enter title..."
            maxLength="16"
            value={newPlaylistTitle}
            onChange={(e) => setNewPlaylistTitle(e.target.value)}
          />
          <AiOutlineFileAdd
            className={styles.add_icon}
            onClick={() => addNewPlaylistHandler()}
          />
        </span>
        <AiOutlineCloseCircle
          className={styles.close_btn}
          onClick={() => setModalToggle(false)}
        />
      </div>
    </div>,
    document.getElementById("root")
  );
}

export default PlaylistModal;
