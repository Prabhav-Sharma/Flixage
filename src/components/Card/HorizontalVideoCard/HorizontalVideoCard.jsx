import React from "react";
import styles from "./HorizontalVideoCard.module.css";
import { AiOutlineDelete } from "react-icons/ai";

function HorizontalVideoCard({ video, onClick }) {
  return (
    <div className={` ${styles.card} flex-row`}>
      <div className={`${styles.left_wrapper} flex-row`}>
        <img
          className={styles.card_img}
          src={video.thumbnail}
          alt={video.title}
        />
        <div className={`${styles.card_text} flex-col`}>
          <h2>{video.title}</h2>
          <h3>{video.author}</h3>
        </div>
      </div>
      <button onClick={onClick} className="prim-btn">
        Remove
        <AiOutlineDelete className={styles.delete_icon} />
      </button>
    </div>
  );
}

export default HorizontalVideoCard;
