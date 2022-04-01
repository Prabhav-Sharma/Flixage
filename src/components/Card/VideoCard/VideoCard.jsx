import React from "react";
import styles from "./VideoCard.module.css";

function VideoCard({ video }) {
  const {
    title,
    thumbnail,
    src,
    playtime,
    author,
    authorImg,
    dateUploaded,
    views,
  } = video;

  return (
    <div className={`${styles.video_card} flex-col`}>
      <div className={styles.top_wrapper}>
        <img className={styles.card_img} src={thumbnail} alt={title} />
        <p className={styles.video_length}>{playtime}</p>
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
