import { useRef, useEffect, useState } from 'react';
import WaveformPlaylist from 'waveform-playlist';
import { Tooltip, Divider, Tabs } from 'antd';
import { CiFolderOn, CiFileOn, CiPause1 } from 'react-icons/ci';
// import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { RiArrowGoBackFill } from 'react-icons/ri';
import { PiDownloadSimple } from 'react-icons/pi';

// import { getAuth } from "firebase/auth";
import Header from '@components/Header';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import lofi from '@assets/lofi.mp3';
import logoSrc from '@assets/logo.svg';

const Composer = () => (
  <div className="flex flex-col flex-1 row-start-2 px-5 pt-6 overflow-x-hidden overflow-y-auto">
    <div className="flex items-start gap-2.5 mb-5 flex-row-reverse">
      <img
        className="w-8 h-8 rounded-full"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
        alt="Ia bot"
      />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-tl-xl rounded-bl-xl rounded-br-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Sam Sepiol</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">a catchy beat for a podcast intro.</p>
      </div>
    </div>

    <div className="flex items-start gap-2.5 mb-5">
      <img
        className="w-8 h-8 rounded-full"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
        alt="Ia bot"
      />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Symphony</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          Drift Away Verse 1: Waves of dreams, they carry me, Softly through the evening sea, City lights begin to fade,
          As night time whispers serenade. Chorus: Drift away, in the twilight haze, Let the world melt into shades,
          Softly now, let the moment play, In this peaceful, lo-fi sway. Verse 2: Starlit skies and gentle rain, Echoes
          of a distant train, Cozy corners, warm and bright, Guide me through the calmest night. Chorus: Drift away, in
          the twilight haze, Let the world melt into shades, Softly now, let the moment play, In this peaceful, lo-fi
          sway. Bridge: Lost in time, where worries cease, Find my place in tranquil peace, Melodies of soft regret, In
          the quiet, I forget. Chorus: Drift away, in the twilight haze, Let the world melt into shades, Softly now, let
          the moment play, In this peaceful, lo-fi sway. Outro: Fading echoes, drift away, In the warmth of night’s
          embrace, Softly now, as dreams replay, In this lo-fi, gentle space.
        </p>
      </div>
    </div>
  </div>
);

const Resources = () => (
  <aside className="w-full py-5 md:w-96">
    <div className="w-full h-full rounded-xl">
      <div className="w-full mt-3 overflow-hidden bg-white border border-gray-300 h-1/2 rounded-xl">
        <div>
          <div className="flex items-center p-3 pl-5">
            <CiFolderOn className="mr-2 text-2xl" />
            <span className="font-semibold">Recursos</span>
          </div>
          <Divider className="mb-3" />
        </div>
        <div className="flex flex-col h-full">
          <div className="flex items-center py-3 pl-3 mb-1 hover:bg-gray-100">
            <CiFileOn className="mr-2 text-xl" />
            <span>La macarena.mp3</span>
          </div>
          <div className="flex items-center py-3 pl-3 mb-1 hover:bg-gray-100">
            <CiFileOn className="mr-2 text-xl" />
            <span>La macarena.mp3</span>
          </div>
          <div className="flex items-center py-3 pl-3 mb-1 hover:bg-gray-100">
            <CiFileOn className="mr-2 text-xl" />
            <span>La macarena.mp3</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
);

const items = [
  {
    key: '1',
    label: 'Recursos',
    children: <Resources />,
  },
  {
    key: '2',
    label: 'Compositor',
    children: <Composer />,
  },
];

const Editor = () => {
  const storage = getStorage();
  const db = getDatabase();
  // const auth = getAuth();

  const refs = useRef({
    container: null,
    playButton: null,
    forwardButton: null,
    backwardButton: null,
    downloadButton: null,
  });
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [donwloadLink, setDonwloadLink] = useState(null);
  const [playlist, setPlaylist] = useState(undefined);

  useEffect(() => {
    setPlaylist(
      WaveformPlaylist({
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
      })
    );
  }, []);

  useEffect(() => {
    playlist
      ?.load([
        {
          src: lofi,
          name: 'Vocals',
          gain: 0.5,
        },
        {
          src: lofi,
          name: 'F',
          gain: 0.5,
        },
      ])
      .then(() => {
        playlist.initExporter();
        const ee = playlist.getEventEmitter();

        refs.current.playButton.onclick = async () => {
          if (isPlayingRef.current) {
            isPlayingRef.current = false;
            setIsPlaying(false);
            ee.emit('pause');
          } else {
            isPlayingRef.current = true;
            setIsPlaying(true);
            ee.emit('play');
          }
        };

        refs.current.downloadButton.onclick = async () => {
          function displayDownloadLink(link) {
            var dateString = new Date().toISOString();
            var $link = 'waveformplaylist' + dateString + '.wav';

            console.log(link, $link);
            setDonwloadLink(link);
          }

          ee.emit('startaudiorendering', 'wav');

          ee.on('audiorenderingfinished', async function (_, data) {
            const storageRef = ref(storage, 'audio-files/' + Date.now() + '.wav');

            try {
              await uploadBytes(storageRef, data);
              const downloadUrl = await getDownloadURL(storageRef);

              const newSongRef = dbRef(db, 'canciones/' + Date.now());
              await set(newSongRef, {
                usuario: 'sources',
                cancion: downloadUrl,
                descripcion:
                  'Pop dance track with catchy melodies, tropical percussion, and upbeat rhythms, perfect for the beach',
              });

              displayDownloadLink(downloadUrl);
            } catch (error) {
              console.error('Error uploading file:', error);
            }
          });
        };

        // refs.current.forwardButton.onclick = () => {};
        // refs.current.backwardButton.onclick = () => {};
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  return (
    <div className="w-full h-[calc(100vh-105px)] md:pt-5 md:pr-3">
      <div className="w-full h-full p-5 bg-white border border-gray-300 md:ml-3 rounded-xl grid grid-rows-[1fr_10px_50px] overflow-hidden">
        <div className="row-start-1 overflow-scroll">
          <div id="container" ref={(el) => (refs.current.container = el)} />
        </div>
        <Divider className="row-start-2 my-3" />
        <div className="flex items-center justify-between row-start-3">
          <div className="flex items-center">
            <Tooltip content="Retroceder 30s">
              <button id="backward" ref={(el) => (refs.current.backwardButton = el)}>
                <RiArrowGoBackFill />
              </button>
            </Tooltip>
            <Tooltip content={isPlaying ? 'Pause' : 'Play'}>
              <button id="play" ref={(el) => (refs.current.playButton = el)}>
                {isPlaying ? <CiPause1 className="text-xl" /> : <img className="h-7" src={logoSrc} alt="" />}
              </button>
            </Tooltip>
            <Tooltip content="Avanzar 30s">
              <button id="forward" ref={(el) => (refs.current.forwardButton = el)}>
                <RiArrowGoBackFill className="transform scale-x-[-1]" />
              </button>
            </Tooltip>
          </div>
          <Tooltip content="Descargar">
            <button id="download" ref={(el) => (refs.current.downloadButton = el)}>
              <PiDownloadSimple className="text-2xl" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const SongEditor = () => {
  return (
    <section className="flex flex-col w-full min-h-[calc(100vh-96px)]">
      <Header />
      <div className="flex flex-col px-5 md:flex-row">
        <Tabs defaultActiveKey="1" className="w-full md:w-[500px]" items={items} />

        <Editor />
      </div>
    </section>
  );
};

export default SongEditor;
