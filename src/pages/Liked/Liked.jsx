import React, { useEffect } from "react";
import { useUserData } from "../../contexts/providers/UserDataProvider";
import styles from "./Liked.module.css";
import { VideoGrid } from "../../components";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fetchLikes, clearAllLikes } from "../../services";
import { useDocumentTitle } from "../../hooks";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "../../contexts/providers/AuthProvider";

function Liked() {
  const {
    state: { likes },
    dispatch: userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  useDocumentTitle("Liked | Flixage");

  useEffect(() => {
    fetchLikes(token, userDataDispatch);
  }, []);

  const navigate = useNavigate();

  const likedItems =
    likes.length !== 0 ? (
      <>
        <div className={`${styles.wrapper} flex-col`}>
          <button
            className={`prim-btn ${styles.clear_btn}`}
            onClick={() => clearAllLikes(token, userDataDispatch)}
          >
            Clear All <AiOutlineDelete className={styles.btn_icon} />
          </button>
        </div>
        <VideoGrid videos={likes} type="LIKES" />
      </>
    ) : (
      <div className={`${styles.empty_wrapper} flex-col`}>
        <h2 className={styles.empty_msg}>
          C'mon, you gotta like something? Let's give it another shot!
        </h2>
        <button
          className={`${styles.explore_btn} prim-btn`}
          onClick={() => navigate("/videos")}
        >
          Explore <MdOutlineExplore className={styles.explore_icon} />
        </button>
      </div>
    );
  return (
    <section>
      <h1 className={`${styles.page_heading}`}>
        <BsFillBookmarkHeartFill /> Liked Videos{" "}
      </h1>
      {likedItems}
    </section>
  );
}

export default Liked;
