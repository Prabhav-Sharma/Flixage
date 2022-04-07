import React from "react";
import styles from "./VideoCard.module.css";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { TiThumbsDown } from "react-icons/ti";
import {
  deleteFromHistory,
  deleteFromWatchLater,
  deleteFromLikes,
} from "../../../services";
import { useUserData } from "../../../contexts/providers/UserDataProvider";
import { WatchLaterButton, LikesButton, PlaylistButton } from "../../index";
import { useAuth } from "../../../contexts/providers/AuthProvider";

function VideoCard({ video, type }) {
  const { dispatch: userDataDispatch } = useUserData();

  const {
    authState: { token },
  } = useAuth();

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

  const FABButton = ({ type }) => {
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

      case "LIKES":
        return (
          <TiThumbsDown
            className={styles.fab_btn}
            onClick={() => deleteFromLikes(_id, token, userDataDispatch)}
          />
        );
      default:
        return " ";
    }
  };

  return (
    <div className={`${styles.video_card} flex-col`}>
      <div className={styles.top_wrapper}>
        <img className={styles.card_img} src={thumbnail} alt={title} />
        <p className={styles.video_length}>{playtime}</p>
        {<FABButton type={type} />}
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

        {token && type === "default" && (
          <span className={`${styles.action_btn_wrapper} flex-row`}>
            {<WatchLaterButton video={video} />}
            {<LikesButton video={video} />}
            {<PlaylistButton video={video} />}
          </span>
        )}
      </div>
    </div>
  );
}

export default VideoCard;
