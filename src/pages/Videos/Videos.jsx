import React from "react";
import { VideoCard } from "../../components";
import styles from "./Videos.module.css";
import { useDocumentTitle } from "../../hooks";
import { useVideos } from "../../contexts/providers/VideosProvider";
import { useEffect } from "react";
import { fetchVideos } from "../../services";

function Videos() {
  const { videos, setVideos } = useVideos();

  useDocumentTitle("Videos | FlixAge");

  useEffect(() => {
    fetchVideos(setVideos);
  }, []);

  return (
    <section className={styles.section}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </section>
  );
}

export default Videos;
