import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks";

function Home() {
  useDocumentTitle("Flixage");
  const navigate = useNavigate();
  return (
    <section className={`${styles.section} flex-col`}>
      <div className={`${styles.container_div} flex-col`}>
        <h2 className={styles.heading}>Home to all your favourite videos</h2>
        <div className={`${styles.btn_container} flex-row`}>
          <button className="prim-btn" onClick={() => navigate("/videos")}>
            Get Started
          </button>
          <button className="prim-acc-btn" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
