import React, { useContext, createContext } from "react";
import styles from "./VideoCard.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteFromHistory } from "../../../services";
import { useUserData } from "../../../contexts/providers/UserDataProvider";

function VideoCard({ video, type }) {
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
    const { dispatch: userDataDispatch } = useUserData();
    const token = localStorage.getItem("token");
    switch (type) {
      case "HISTORY":
        return (
          <AiOutlineDelete
            className={styles.fab_btn}
            onClick={() => deleteFromHistory(_id, token, userDataDispatch)}
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
        {fabBtn(type)}
      </div>
      <div className="flex-row">
        <img className={styles.channel_icon} src={authorImg} />
        <div className={`${styles.bottom_right_wrapper} flex-col`}>
          <h1 className={styles.video_title}>{title}</h1>
          <h3>{author}</h3>
          <span className={`flex-row`}>
            <p>{views} views</p> • <p>{dateUploaded}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
