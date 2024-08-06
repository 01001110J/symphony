import { useRef, useEffect, useState, useContext } from 'react';
import { Tooltip, Divider, Button } from 'antd';
import WaveformPlaylist from 'waveform-playlist';

import { CiPause1 } from 'react-icons/ci';
import { PiDownloadSimple } from 'react-icons/pi';
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx';

import { SongContext } from '@context/Song';
import { DarkThemeContext } from '@context/DarkTheme';
import Stars from '@layouts/Stars';

import logoWhiteSrc from '@assets/logo.svg';
import logoDarkSrc from '@assets/logo-white.svg';

let playlistInstance = null;

const Editor = () => {
  const { songList, handleRemoveTrack, setPlaylistEmitter, playListEmitter } = useContext(SongContext);

  const refs = useRef({
    container: null,
    playButton: null,
    forwardButton: null,
    backwardButton: null,
    downloadButton: null,
    downloadLink: null,
    addNewTrackButton: null,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const { isDarkMode } = useContext(DarkThemeContext);

  const getOrCreatePlaylist = () => {
    if (!playlistInstance) {
      playlistInstance = WaveformPlaylist({
        samplesPerPixel: 128,
        waveHeight: 100,
        container: refs.current.container,
        state: 'shift',
        timescale: true,
        controls: {
          show: true,
          width: 200,
        },
        seekStyle: 'line',
        zoomLevels: [128, 256, 512],
      });
    }

    return playlistInstance;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return playListEmitter.emit('pause');
    }
    setIsPlaying(true);
    return playListEmitter.emit('play');
  };

  const handleRewind = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    playListEmitter.emit('rewind');
  };

  const handleFastForward = () => playListEmitter.emit('fastforward');

  const loadTracksToEditor = (songTracks) => {
    const playList = getOrCreatePlaylist();

    playList?.load(songTracks).then(() => {
      playList.initExporter();
      const ee = playList.getEventEmitter();
      setPlaylistEmitter(ee);

      ee.on('removeTrack', (song) => handleRemoveTrack(song.src));

      refs.current.downloadButton.onmouseenter = async () => {
        ee.emit('startaudiorendering', 'wav');

        ee.on('audiorenderingfinished', function (type, data) {
          if (type == 'wav') {
            const url = window.URL.createObjectURL(data);
            setDownloadLink(url);
          }
        });
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (refs.current.container) {
      const songTracks = songList.map(({ name, url }) => ({
        gain: 0.5,
        name,
        src: url,
      }));

      loadTracksToEditor(songTracks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stars />
      <div className="w-full h-[calc(100vh-105px)] md:pt-5 md:pr-3">
        <div className="w-full h-full p-5 md:ml-3 grid grid-rows-[1fr_10px_50px] overflow-hidden">
          <div className="flex flex-col row-start-1">
            <h1 className="text-3xl text-white">Pistas</h1>
            <Divider className="my-3 mt-2" />
            <div className="overflow-x-hidden overflow-y-auto">
              <div id="container" ref={(el) => (refs.current.container = el)} />
            </div>
          </div>
          <Divider className="row-start-2 my-3" />
          <div className="flex items-center justify-between row-start-3 p-5 bg-slate-200 dark:text-white rounded-xl dark:bg-slate-900">
            <div className="flex items-center">
              <Tooltip title="Rewind">
                <button id="backward" className="mr-3" onClick={handleRewind}>
                  <RxTrackPrevious />
                </button>
              </Tooltip>
              <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
                <button id="play" onClick={handleTogglePlay}>
                  {isPlaying ? (
                    <CiPause1 className="text-xl" />
                  ) : (
                    <img className="h-7" src={isDarkMode ? logoDarkSrc : logoWhiteSrc} alt="" />
                  )}
                </button>
              </Tooltip>
              <Tooltip title="Fast Forward">
                <button id="backward" className="ml-3" onClick={handleFastForward}>
                  <RxTrackNext />
                </button>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip title="Descargar">
                <a href={downloadLink} download="symphony-track.wav">
                  <Button className="flex" ref={(el) => (refs.current.downloadButton = el)}>
                    Descargar canción
                    <PiDownloadSimple className="text-2xl" />
                  </Button>
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
/*  */
export default Editor;
