import { useContext, createContext } from "react";
import { useState } from "react";

const VideosContext = createContext(null);

const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  return (
    <VideosContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { VideosProvider, useVideos };
