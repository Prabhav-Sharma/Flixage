import { useState } from "react";
import { VideoGrid } from "../../components";
import { useDocumentTitle } from "../../hooks";
import { useVideos } from "../../contexts/providers/VideosProvider";
import styles from "./Videos.module.css";

function Videos() {
  const { videos } = useVideos();
  const [currentCategory, setCurrentCategory] = useState("All");

  useDocumentTitle("Videos | FlixAge");

  const categories = videos.reduce(
    (acc, curr) =>
      acc.indexOf(curr.category) === -1 ? [...acc, curr.category] : acc,
    []
  );

  return (
    <section>
      <div className={`${styles.categories}`}>
        <h3>Categories:</h3>
        <p
          className={`${styles.category_label} ${
            currentCategory === "All" && styles.category_active
          } `}
          onClick={() => setCurrentCategory("All")}
        >
          All
        </p>
        {categories.map((category, index) => (
          <p
            key={index}
            className={`${styles.category_label}  ${
              currentCategory === category && styles.category_active
            }`}
            onClick={() => setCurrentCategory(category)}
          >
            {category}
          </p>
        ))}
      </div>
      <VideoGrid
        videos={
          currentCategory === "All"
            ? videos
            : videos.filter((video) => video.category === currentCategory)
        }
      />
    </section>
  );
}

export default Videos;
