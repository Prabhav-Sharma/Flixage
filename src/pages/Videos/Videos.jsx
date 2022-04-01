import React from "react";
import VideoCard from "../../components/Card/VideoCard/VideoCard";
import styles from "./Videos.module.css";
import { useDocumentTitle } from "../../hooks";
import { useVideos } from "../../contexts/providers/VideosProvider";
import { useEffect } from "react";
import { fetchVideos } from "../../services/APICalls";
const video = {
  title: "Naruto: Beast Mode",
  thumbnail:
    "https://www.whats-on-netflix.com/wp-content/uploads/2018/09/naruto-on-netflix.jpg",
  src: "",
  playtime: "3:21",
  author: "Oscar Stinson",
  authorImg:
    "https://www.whats-on-netflix.com/wp-content/uploads/2018/09/naruto-on-netflix.jpg",
  dateUploaded: "2 Months ago",
  views: 167,
};

function Videos() {
  const { videos, setVideos } = useVideos();

  console.log(videos);
  useEffect(() => {
    fetchVideos(setVideos);
  }, []);

  useDocumentTitle("Videos | FlixAge");
  return (
    <section className={styles.section}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </section>
  );
}

export default Videos;
