import { useRef, useEffect, useState, useContext } from 'react';
import WaveformPlaylist from 'waveform-playlist';
import { Tooltip, Divider, Tabs, Tree, Popconfirm, Button } from 'antd';
import { CiFolderOn, CiPause1 } from 'react-icons/ci';
import { BsFileEarmarkMusic } from 'react-icons/bs';

// import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { RiArrowGoBackFill } from 'react-icons/ri';
import { PiDownloadSimple } from 'react-icons/pi';

// import { getAuth } from "firebase/auth";
import Header from '@components/Header';
import { SongContext } from '@context/Song';
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

const Resources = () => {
  const { songList, handleRemoveTrack } = useContext(SongContext);

  // eslint-disable-next-line react/prop-types
  const ResourceItem = ({ name, url, onConfirm }) => (
    <div className="flex items-center w-full">
      <BsFileEarmarkMusic className="mt-1" />
      <span className="px-3 ml-5 mr-10">{name}</span>
      <Popconfirm
        title="Eliminar canción."
        description="¿Estas seguro de eliminar esta canción?"
        onConfirm={() => onConfirm(url)}
        onCancel={() => null}
        okText="Sí"
        cancelText="No"
      >
        <Button danger>
          <img src="/audio-delete.svg" alt="" />
        </Button>
      </Popconfirm>
    </div>
  );

  const songResources = songList.map(({ name, url }) => ({
    title: <ResourceItem name={name} url={url} onConfirm={handleRemoveTrack} />,
    key: `0-0-${name}}`,
  }));

  const treeData = [
    {
      title: 'Recursos usados en este proyecto',
      key: '0-0',
      icon: <CiFolderOn className="mt-1 text-lg" />,
      children: songResources,
    },
  ];
  return (
    <aside className="flex flex-col flex-1 h-full row-start-2 px-1 overflow-x-hidden overflow-y-auto ant-tabs-content">
      <Tree showIcon defaultExpandAll defaultSelectedKeys={['0-0-2']} treeData={treeData} />
    </aside>
  );
};

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
  const { songList } = useContext(SongContext);
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
  const [, setDownloadLink] = useState(null);
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
    const songTracks = songList.map(({ name, url }) => ({
      gain: 0.5,
      name,
      src: url,
    }));

    playlist?.load(songTracks).then(() => {
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
          setDownloadLink(link);
        }

        ee.emit('startaudiorendering', 'wav');

        ee.on('audiorenderingfinished', async function (_, data) {
          const storageRef = ref(storage, 'audio-files/' + Date.now() + '.wav');

          try {
            await uploadBytes(storageRef, data);
            const downloadUrl = await getDownloadURL(storageRef);

            const newSongRef = dbRef(db, 'songs/' + Date.now());
            await set(newSongRef, {
              user: 'sources',
              url: downloadUrl,
              description: 'rock with saturated guitars, a heavy bass line and crazy drum break and fills.',
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
      <div className="w-full h-full p-5 md:ml-3 grid grid-rows-[1fr_10px_50px] overflow-hidden">
        <div className="flex flex-col row-start-1">
          <h1 className="text-3xl text-white">Pistas</h1>
          <Divider className="my-3 mt-2" />
          <div className="overflow-x-hidden">
            <div id="container" ref={(el) => (refs.current.container = el)} />
          </div>
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
    <section className="flex flex-col w-full min-h-[calc(100vh-96px)] px-5">
      <Header />
      <div className="flex flex-col px-5 md:flex-row bg-[#1e293b99] rounded-xl">
        <Tabs defaultActiveKey="1" className="w-full md:w-[500px] pt-10" items={items} />
        <Editor />
      </div>
    </section>
  );
};

export default SongEditor;
