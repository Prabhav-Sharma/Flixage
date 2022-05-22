import { useEffect } from "react";
import { useUserData } from "../../contexts/providers/UserDataProvider";
import { useDocumentTitle } from "../../hooks";
import { fetchHistory, clearAllHistory } from "../../services";
import { AiOutlineDelete, MdOutlineExplore } from "../../utils/icons";
import { Link } from "react-router-dom";
import { VideoGrid } from "../../components";
import { useAuth } from "../../contexts/providers/AuthProvider";
import styles from "./History.module.css";

function History() {
  const {
    state: { history },
    dispatch: userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  useDocumentTitle("History | Flixage");

  useEffect(() => {
    fetchHistory(token, userDataDispatch);
  }, []);

  const historyItems =
    history.length !== 0 ? (
      <>
        <div className={`${styles.wrapper} flex-col`}>
          <button
            className={`prim-btn ${styles.clear_btn}`}
            onClick={() => clearAllHistory(token, userDataDispatch)}
          >
            Clear All <AiOutlineDelete className={styles.btn_icon} />
          </button>
        </div>
        <VideoGrid videos={[...history].reverse()} type={"HISTORY"} />
      </>
    ) : (
      <div className={`${styles.wrapper} flex-col`}>
        <h2 className={styles.no_history_msg}>
          You must create History in order to witness it.
        </h2>
        <Link
          to="/videos"
          className={`prim-btn ${styles.explore_btn} ${styles.link_style}`}
        >
          Explore <MdOutlineExplore className={styles.btn_icon} />
        </Link>
      </div>
    );

  return (
    <section>
      <h1 className={`${styles.page_heading}`}>Watch History</h1>
      {historyItems}
    </section>
  );
}

export default History;
