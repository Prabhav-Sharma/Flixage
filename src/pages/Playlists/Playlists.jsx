import React, { useEffect, useState } from "react";
import styles from "./Playlists.module.css";
import { useDocumentTitle } from "../../hooks";
import { useUserData } from "../../contexts/providers/UserDataProvider";
import {
  addPlaylist,
  fetchAllPlaylists,
  removeFromPlaylist,
  removePlaylist,
} from "../../services";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsMusicPlayer } from "react-icons/bs";
import { TextInput, HorizontalVideoCard } from "../../components";
import { GoTrashcan } from "react-icons/go";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { toast } from "react-toastify";

function Playlists() {
  const {
    state: { playlists },
    dispatch: userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  const [currentPlaylist, setCurrentPlaylist] = useState({
    title: "Playlist",
    videos: [],
  });

  useEffect(() => {
    fetchAllPlaylists(token, userDataDispatch);
  }, []);

  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");

  useDocumentTitle("Playlists | Flixage");

  const addPlaylistHandler = async () => {
    const title = newPlaylistTitle.trim();
    if (title.length === 0) {
      toast.info("You must name your playlist");
      return;
    }

    if (
      playlists.some(
        (playlist) => playlist.title.toLowerCase() === title.toLowerCase()
      )
    ) {
      toast.info(`Playlist with the name '${title}' already exists!`);
      return;
    }

    await addPlaylist({ title: title }, token, userDataDispatch);
    setNewPlaylistTitle("");
  };

  const removePlaylistHandler = async (id) => {
    await removePlaylist(id, token, userDataDispatch);
    if (playlists.length === 1) {
      setCurrentPlaylist({
        title: "Playlist",
        videos: [],
      });
    }
  };

  const removeFromPlaylistHandler = async (videoID) => {
    await removeFromPlaylist(
      currentPlaylist._id,
      videoID,
      token,
      userDataDispatch
    );
    const newPlaylistItems = currentPlaylist.videos.filter(
      (item) => item._id !== videoID
    );
    setCurrentPlaylist({ ...currentPlaylist, videos: newPlaylistItems });
  };

  return (
    <>
      <h1 className={`${styles.page_heading}`}>
        Playlists <BsMusicPlayer className={styles.player_icon} /> (
        {playlists.length})
      </h1>

      <section className={styles.playlists_grid}>
        <div className={styles.playlists_wrapper}>
          <h1 className={styles.current_title}>#{currentPlaylist.title}</h1>

          {currentPlaylist.videos.length !== 0 ? (
            currentPlaylist.videos.map((video) => (
              <HorizontalVideoCard
                key={video._id}
                video={video}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromPlaylistHandler(video._id);
                }}
              />
            ))
          ) : (
            <h2 className={styles.empty_msg}>No videos to show!</h2>
          )}
        </div>
        <div className={`${styles.side_wrapper} flex-col`}>
          <div className={`${styles.add_new_wrapper} flex-col`}>
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
                onClick={() => addPlaylistHandler()}
              />
            </span>
          </div>

          <ul>
            {playlists.map((playlist) => (
              <li key={playlist._id} className={`${styles.playlist_item}`}>
                <span
                  onClick={() => setCurrentPlaylist(playlist)}
                  className={`${styles.playlist_title_wrapper} flex-row`}
                >
                  <h2 className={styles.playlist_title}>{playlist.title}</h2>
                  <h3>({playlist.videos.length} videos)</h3>
                </span>
                <GoTrashcan
                  className={styles.remove_icon}
                  onClick={() => removePlaylistHandler(playlist._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Playlists;
