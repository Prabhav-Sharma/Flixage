import React from "react";
import styles from "./Navigation.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineWatchLater, MdSlowMotionVideo } from "react-icons/md";
import { FaHome, FaHistory } from "react-icons/fa";
import { BsPlayBtn, BsHeart } from "react-icons/bs";
import { useToggle } from "../../hooks";
import { NavLink } from "react-router-dom";

function Navigation() {
  const { toggle: visible, setToggle: setVisible } = useToggle(true);

  const linkStyle = ({ isActive }) =>
    isActive
      ? `${styles.link_style} ${styles.link_style_active}`
      : `${styles.link_style}`;

  return (
    <>
      <nav className={`${styles.nav_bar} flex-row`}>
        <div className={`${styles.header} flex-row`}>
          <span
            className={styles.menu_icon}
            onClick={() => setVisible((v) => !v)}
          >
            <GiHamburgerMenu />
          </span>
          <h1 className={styles.nav_heading}>
            Flix<span className={styles.red}>age</span>
          </h1>
        </div>
        <input
          className={styles.nav_search}
          placeholder="Search across your favourite tittles here.."
          type={"text"}
        />
        <a>
          <img
            className={styles.profile_icon}
            src={
              "https://res.cloudinary.com/carsmart/image/upload/v1648707066/Flixage/icons/alien_2_wvzwe6.png"
            }
          />
        </a>
      </nav>

      <aside
        className={` ${styles.aside} ${
          visible ? "" : styles.aside_hidden
        } flex-col`}
      >
        <span className={"flex-row"}>
          <ul className={`${styles.list} flex-col`}>
            <li>
              <NavLink to="/" className={linkStyle}>
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/videos" className={linkStyle}>
                <MdSlowMotionVideo /> Videos
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={linkStyle}>
                <FaHistory /> History
              </NavLink>
            </li>
            <li>
              <NavLink to="/watchlater" className={linkStyle}>
                <MdOutlineWatchLater /> Watch later
              </NavLink>
            </li>
            <li>
              <NavLink to="/playlists" className={styles.link_style}>
                <BsPlayBtn /> Playlists
              </NavLink>
            </li>
            <li>
              <NavLink to="/liked" className={styles.link_style}>
                <BsHeart /> Liked videos
              </NavLink>
            </li>
          </ul>
        </span>
      </aside>

      <div
        className={`${
          visible ? styles.sidebar_overlay : styles.sidebar_overlay_hidden
        }`}
        onClick={() => setVisible(false)}
      ></div>
    </>
  );
}

export default Navigation;