import React, { useEffect } from "react";
import { useUserData } from "../../contexts/providers/UserDataProvider";
import { fetchWatchLater, removeAllWatchLater } from "../../services";
import { MdOutlineWatchLater } from "react-icons/md";
import { VideoGrid } from "../../components";
import styles from "./WatchLater.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

function WatchLater() {
  const navigate = useNavigate();
  const {
    state: { watchlater },
    dispatch: userDataDispatch,
  } = useUserData();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWatchLater(token, userDataDispatch);
  }, []);

  const watchlaterWrapper =
    watchlater.length !== 0 ? (
      <>
        <div className={`${styles.wrapper} flex-col`}>
          <button
            className={`prim-btn ${styles.clear_btn}`}
            onClick={() => removeAllWatchLater(token, userDataDispatch)}
          >
            Clear All <AiOutlineDelete className={styles.btn_icon} />
          </button>
        </div>
        <VideoGrid videos={watchlater} type="WATCH_LATER" />
      </>
    ) : (
      <div className={`${styles.empty_msg_wrapper} flex-col`}>
        <h2 className={styles.empty_msg}>
          Don't have time? Add videos to watch later and come back anytime.
        </h2>
        <button
          className={`${styles.empty_msg_btn} prim-btn`}
          onClick={() => navigate("/videos")}
        >
          Get Started
        </button>
      </div>
    );

  return (
    <section>
      <h1 className={`${styles.page_heading}`}>
        Watch Later
        <MdOutlineWatchLater className={styles.heading_icon} />
      </h1>
      {watchlaterWrapper}
    </section>
  );
}

export default WatchLater;
