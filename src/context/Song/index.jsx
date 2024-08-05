import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [showSongForm, setShowSongForm] = useState(true);
  const [songList, setSongList] = useState([]);

  const handleRemoveTrack = (songUrl) => {
    const newList = songList.filter((song) => song.url !== songUrl);
    setSongList(newList);
  };

  return (
    <SongContext.Provider
      value={{
        songList,
        showSongForm,
        setSongList,
        setShowSongForm,
        handleRemoveTrack,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

SongProvider.propTypes = {
  children: PropTypes.node,
};

export default SongProvider;
