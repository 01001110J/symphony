import { useRef, useState, useContext } from 'react';
import { Tag, Tooltip, Button } from 'antd';
import PropTypes from 'prop-types';

import { CiPause1 } from 'react-icons/ci';
import { BsDownload } from 'react-icons/bs';

import { DarkThemeContext } from '@context/DarkTheme';

import logoWhiteSrc from '@assets/logo.svg';
import logoDarkSrc from '@assets/logo-white.svg';

const MusicItemSkeleton = () => (
  <article className="w-[90%] mb-4 rounded-xl bg-gray-300 p-0.5 shadow-xl animate-pulse">
    <div className="rounded-[10px] bg-white p-4 sm:p-4 dark:bg-slate-950 relative">
      <div className="absolute w-8 h-6 mb-1 bg-gray-300 rounded top-2 right-3" />
      <div className="w-3/4 h-6 mb-2 bg-gray-300 rounded"></div>
      <div className="w-1/4 h-4 mb-4 bg-gray-300 rounded"></div>
      <div className="flex items-end justify-between h-fit">
        <div className="flex flex-wrap gap-1 mt-4">
          <div className="w-16 h-6 mb-1 bg-gray-300 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="w-16 h-6 mb-1 bg-gray-300 rounded" />
          <div className="w-16 h-6 mb-1 bg-gray-300 rounded" />
          <div className="w-16 h-6 mb-1 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  </article>
);

const MusicItem = ({
  songUrl,
  title,
  userName,
  tags,
  onPlayNext,
  changeSize = true,
  loading = false,
  showContinueButton = true,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDarkMode } = useContext(DarkThemeContext);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return <MusicItemSkeleton />;
  }

  return (
    <article
      className={`w-[90%] mb-4 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] ${changeSize && 'hover:scale-105'}`}
    >
      <audio ref={audioRef} src={songUrl} className="hidden" />
      <div className="rounded-[10px] bg-white p-4 sm:p-6 dark:bg-slate-950 relative">
        <span className="absolute text-gray-600 right-3 top-1">30s</span>
        <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        <span className="block text-xs text-gray-500">{userName}</span>
        <div className="flex items-end justify-between h-fit">
          <div className="flex flex-wrap gap-1 mt-4">
            {tags?.map((tag) => (
              <Tag color="purple" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
          <div className="flex items-end">
            <Tooltip title="Descargar canción">
              <a className="flex items-end mr-4" href={songUrl} download={`${title}-symphony.wav`}>
                <Button className="dark:text-white h-[22px]">
                  <BsDownload />
                </Button>
              </a>
            </Tooltip>
            <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
              <Button onClick={toggleAudio} className="dark:text-white h-[22px]">
                {isPlaying ? (
                  <CiPause1 />
                ) : (
                  <img src={isDarkMode ? logoDarkSrc : logoWhiteSrc} alt="" className="h-full" />
                )}
              </Button>
            </Tooltip>
            {showContinueButton && (
              <Tooltip title="Al continuar con este audio se generará un nuevo proyecto">
                <Button
                  className="ml-4 dark:text-white h-[22px]"
                  onClick={() =>
                    onPlayNext({
                      name: title,
                      url: songUrl,
                    })
                  }
                >
                  Crear una pieza compleja
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

MusicItem.propTypes = {
  songUrl: PropTypes.string,
  title: PropTypes.string,
  userName: PropTypes.string,
  tags: PropTypes.array,
  changeSize: PropTypes.bool,
  loading: PropTypes.bool,
  onPlayNext: PropTypes.func,
  showContinueButton: PropTypes.bool,
};

export default MusicItem;
