import React from "react";
import styles from "./VideoCard.module.css";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { CgPlayListAdd, CgPlayListRemove } from "react-icons/cg";
import { RiHeartAddLine, RiDislikeLine } from "react-icons/ri";
import {
  addToWatchLater,
  deleteFromHistory,
  deleteFromWatchLater,
} from "../../../services";
import { useUserData } from "../../../contexts/providers/UserDataProvider";

function VideoCard({ video, type }) {
  const {
    state: { watchlater, liked, playlist },
    dispatch: userDataDispatch,
  } = useUserData();

  const token = localStorage.getItem("token");
  const {
    _id,
    title,
    thumbnail,
    src,
    playtime,
    author,
    authorImg,
    dateUploaded,
    views,
  } = video;

  const fabBtn = (type) => {
    switch (type) {
      case "HISTORY":
        return (
          <AiOutlineDelete
            className={styles.fab_btn}
            onClick={() => deleteFromHistory(_id, token, userDataDispatch)}
          />
        );
      case "WATCH_LATER":
        return (
          <AiOutlineClose
            className={styles.fab_btn}
            onClick={() => deleteFromWatchLater(_id, token, userDataDispatch)}
          />
        );
      default:
        return " ";
    }
  };

  const watchLaterActionBtn = watchlater.some((item) => item._id === _id) ? (
    <MdOutlineWatchLater
      className={styles.action_btn_active}
      onClick={() => deleteFromWatchLater(_id, token, userDataDispatch)}
    />
  ) : (
    <MdOutlineWatchLater
      className={styles.action_btn}
      onClick={() => addToWatchLater({ video: video }, token, userDataDispatch)}
    />
  );

  const likeActionBtn = liked.some((item) => item._id === _id) ? (
    <RiDislikeLine
      className={styles.action_btn_active}
      onClick={() => console.log("Feature Pending")}
    />
  ) : (
    <RiHeartAddLine
      className={styles.action_btn}
      onClick={() => console.log("Feature Pending")}
    />
  );

  const playlistActionBtn = liked.some((item) => item._id === _id) ? (
    <CgPlayListRemove
      className={styles.action_btn_active}
      onClick={() => console.log("Feature Pending")}
    />
  ) : (
    <CgPlayListAdd
      className={styles.action_btn}
      onClick={() => console.log("Feature Pending")}
    />
  );

  return (
    <div className={`${styles.video_card} flex-col`}>
      <div className={styles.top_wrapper}>
        <img className={styles.card_img} src={thumbnail} alt={title} />
        <p className={styles.video_length}>{playtime}</p>
        {fabBtn(type)}
      </div>
      <div className={`${styles.bottom_wrapper} flex-row`}>
        <img className={styles.channel_icon} src={authorImg} />
        <div className={`${styles.bottom_right_wrapper} flex-col`}>
          <h1 className={styles.video_title}>{title}</h1>
          <h3>{author}</h3>
          <span className={`flex-row`}>
            <p>{views} views</p> • <p>{dateUploaded}</p>
          </span>
        </div>
        <span className={`${styles.action_btn_wrapper} flex-row`}>
          {watchLaterActionBtn}
          {likeActionBtn}
          {playlistActionBtn}
        </span>
      </div>
    </div>
  );
}

export default VideoCard;
