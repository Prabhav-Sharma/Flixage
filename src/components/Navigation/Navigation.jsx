import { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { useToggle } from "../../hooks";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { useVideos } from "../../contexts/providers/VideosProvider";
import { fetchVideos } from "../../services";
import {
  GiHamburgerMenu,
  MdOutlineWatchLater,
  MdSlowMotionVideo,
  FaHome,
  FaHistory,
  BsPlayBtn,
  BsHeart,
  BiLogOut,
  BiLogIn,
  RiLogoutCircleRLine,
  CgProfile,
} from "../../utils/icons";

function Navigation() {
  const { toggle: visible, setToggle: setVisible } = useToggle(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useAuth();

  const { videos, setVideos } = useVideos();

  useEffect(() => {
    fetchVideos(setVideos);
  }, []);

  const searchVideos = (videos, query) => {
    if (query.trim().length === 0) return [];

    return videos.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  };

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
          <h1 className={styles.nav_heading} onClick={() => navigate("/")}>
            Flix<span className={styles.red}>age</span>
          </h1>
        </div>
        <div className={styles.search_bar}>
          <input
            className={styles.nav_search}
            placeholder="Search across your favourite tittles here.."
            type={"text"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul
            style={{
              display:
                searchVideos(videos, query).length === 0 ? "none" : "flex",
            }}
            className={styles.search_results}
          >
            {searchVideos(videos, query).map((video) => (
              <li
                key={video._id}
                onClick={() => {
                  setQuery("");
                  navigate(`/video/${video._id}`);
                }}
              >
                {video.title}
              </li>
            ))}
          </ul>
        </div>
        {isAuthenticated ? (
          <RiLogoutCircleRLine
            className={styles.authentication_icon}
            onClick={() => authDispatch({ type: "LOGOUT" })}
          />
        ) : (
          <CgProfile
            className={styles.authentication_icon}
            onClick={() => navigate("/login", { state: { from: location } })}
          />
        )}
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
              <NavLink to="/playlists" className={linkStyle}>
                <BsPlayBtn /> Playlists
              </NavLink>
            </li>
            <li>
              <NavLink to="/likes" className={linkStyle}>
                <BsHeart /> Liked videos
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li>
                <NavLink
                  to="/login"
                  onClick={() => authDispatch({ type: "LOGOUT" })}
                  className={linkStyle}
                >
                  <BiLogOut /> Logout
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login" className={linkStyle}>
                  <BiLogIn /> Login
                </NavLink>
              </li>
            )}
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
