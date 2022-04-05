import React from "react";
import { VideoGrid } from "../../components";
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
    <section>
      <VideoGrid videos={videos} />
    </section>
  );
}

export default Videos;
