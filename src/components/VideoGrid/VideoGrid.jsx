import React from "react";
import styles from "./VideoGrid.module.css";
import { VideoCard } from "../index";

function VideoGrid({ videos = [], classNames, type = "default" }) {
  return (
    <div className={`${styles.videos_wrapper} ${classNames}`}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} type={type} />
      ))}
    </div>
  );
}

export default VideoGrid;
