import React from "react";
import { useEffect } from "react";
import { useUserData } from "../../contexts/providers/UserDataProvider";
import { useDocumentTitle } from "../../hooks";
import {
  fetchHistory,
  addToHistory,
  deleteFromHistory,
  clearAllHistory,
  fetchVideos,
} from "../../services";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import { VideoGrid } from "../../components";
import styles from "./History.module.css";
import { useAuth } from "../../contexts/providers/AuthProvider";

//temp import
import { useVideos } from "../../contexts/providers/VideosProvider";

function History() {
  const {
    state: { history },
    dispatch: userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();
  useDocumentTitle("History | Flixage");

  useEffect(() => {
    fetchHistory(token, userDataDispatch);
    fetchVideos(setVideos);
  }, []);

  //temporary functions till addToHistory function is added on the single video page, which at the time, doesn't exist.
  const { videos, setVideos } = useVideos();
  const loadDummyHistory = async () => {
    await videos.forEach((video) =>
      addToHistory({ video: video }, token, userDataDispatch)
    );
  };

  const historyItems =
    history.length !== 0 ? (
      <>
        <div className={`${styles.wrapper} flex-col`}>
          <button
            className={`prim-btn ${styles.clear_btn}`}
            onClick={() => clearAllHistory(token, userDataDispatch)}
          >
            Clear All <AiOutlineDelete className={styles.btn_icon} />
          </button>
        </div>
        <VideoGrid videos={history} type={"HISTORY"} />
      </>
    ) : (
      <div className={`${styles.wrapper} flex-col`}>
        <h2 className={styles.no_history_msg}>
          You must create History, in order to witness it.
        </h2>
        <button className={`prim-btn ${styles.explore_btn}`}>
          <Link to="/videos" className={styles.link_style}>
            Explore <MdOutlineExplore className={styles.btn_icon} />
          </Link>
        </button>
        <button
          onClick={() => loadDummyHistory()}
          className={`prim-btn ${styles.dummy_btn}`}
        >
          Add Dummy History
        </button>
      </div>
    );

  return (
    <section>
      <h1 className={`${styles.page_heading}`}>Watch History</h1>
      {historyItems}
    </section>
  );
}

export default History;
