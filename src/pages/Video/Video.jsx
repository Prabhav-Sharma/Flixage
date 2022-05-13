import { useEffect, useState } from "react";
import styles from "./Video.module.css";
import ReactPlayer from "react-player/youtube";
import { addToHistory, fetchVideo } from "../../services";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { useUserData } from "../../contexts/providers/UserDataProvider";
import {
  LikesButton,
  PlaylistButton,
  WatchLaterButton,
} from "../../components";
import { useDocumentTitle } from "../../hooks";

function Video() {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const {
    authState: { token, isAuthenticated },
  } = useAuth();

  const {
    state: { history },
    dispatch: userDataDispatch,
  } = useUserData();

  useEffect(() => {
    fetchVideo(videoId, setVideo);
  }, [videoId]);

  const handleScreenResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);

    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  const { _id, title, src, author, authorImg, dateUploaded, views } = video;

  useDocumentTitle(title === undefined ? "Loading Video..." : title);

  useEffect(() => {
    if (
      isAuthenticated &&
      _id !== undefined &&
      history.every((video) => video._id !== _id)
    )
      addToHistory({ video: video }, token, userDataDispatch);
  }, [video]);

  return (
    <section className={`flex-row`}>
      <div className="flex-col">
        <ReactPlayer
          url={src}
          controls={true}
          height={screenWidth > 460 ? "75vh" : "60vh"}
          width={"100vw"}
          styles={{
            paddingTop: "56%",
            position: "relative",
          }}
        />
        <div className={`${styles.bottom_wrapper} flex-row`}>
          <div className={styles.details_wrapper}>
            <img className={styles.channel_icon} src={authorImg} />
            <div className={`${styles.bottom_right_wrapper} flex-col`}>
              <h3>{author}</h3>
              <span className={` flex-row`}>
                <p>
                  {views?.toLocaleString()} views • {dateUploaded}
                </p>
              </span>
            </div>
          </div>
          {isAuthenticated && (
            <span className={`${styles.actionBtns} flex-row`}>
              <PlaylistButton
                text={screenWidth > 520 ? true : false}
                video={video}
              />
              <WatchLaterButton
                text={screenWidth > 520 ? true : false}
                video={video}
              />
              <LikesButton
                text={screenWidth > 520 ? true : false}
                video={video}
              />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default Video;
