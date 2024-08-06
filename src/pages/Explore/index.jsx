import { useContext } from 'react';
import { Tabs } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import Stars from '@layouts/Stars';
import Container from '@layouts/Container';

import { DarkThemeContext } from '@context/DarkTheme';

import Settings from '@pages/Settings';
import Logo from '@components/Header/Logo';
import MusicItem from '@components/MusicItem';

const trackList = [
  {
    title: 'Beachside Vibes: Upbeat Pop Dance Anthem',
    url: '/audios/000_sample.mp3',
    tag: 'TropicalPop',
  },
  {
    title: 'Reggae Fusion: Classic Vibes with an Electric Twist',
    url: '/audios/002_sample.mp3',
    tag: 'ReggaeFusion',
  },
  {
    title: 'Organic Echoes: Lofi Electro Chill',
    url: '/audios/004_sample.mp3',
    tag: 'LofiChill',
  },
];

const Songs = () => {
  const navigate = useNavigate();

  const navigateToSongForm = () => navigate('/song/new');

  return (
    <div className="music-list-container ant-tabs-content">
      {trackList.map(({ title, url, tag }) => (
        <MusicItem
          key={title}
          title={title}
          songUrl={url}
          tags={[tag]}
          onPlayNext={navigateToSongForm}
          showContinueButton={false}
          changeSize={false}
        />
      ))}
    </div>
  );
};

const Explore = () => {
  const { isDarkMode } = useContext(DarkThemeContext);

  const items = [
    {
      key: '1',
      label: 'Canciones',
      children: <Songs />,
    },
    {
      key: '2',
      label: 'Settings',
      children: <Settings />,
    },
  ];

  return (
    <Container>
      <Stars />
      <nav className="absolute top-0 left-0 z-20 flex items-center justify-between w-full p-6">
        <Logo />
      </nav>
      <section className="flex flex-col w-full h-full md:flex-row">
        <div
          className={`flex flex-col justify-center flex-1 min-h-screen pt-20 lg:pt-0 ${isDarkMode && 'back-gradient'}`}
        >
          <div className="px-6 lg:px-0 lg:pl-20">
            <h1 className="flex flex-col mb-5 text-4xl font-extrabold dark:text-white text-custom sm:text-7xl">
              Permítenos ayudarte a descubrir
              <strong className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-7xl">
                {' '}
                la Sinfonía de Tu Alma.{' '}
              </strong>
            </h1>

            <p className="max-w-xl mt-4 leading-5 text-custom">
              Symphony te permite crear canciones únicas para tus proyectos artísticos. Con nuestra avanzada IA, puedes
              generar pistas personalizadas, añadir, eliminar y fusionar múltiples pistas de audio.
            </p>
            <div className="flex flex-wrap gap-4 pb-6 mt-8 lg:pb-0">
              <Link
                className="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-transparent hover:text-blue-600 dark:hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                to="/song/new"
              >
                Comenzar
              </Link>
            </div>
          </div>
        </div>
        <div className="min-h-screen flex flex-col pt-6 lg:pt-0 h-fit items-center justify-center flex-1 backdrop-blur-md relative dark:bg-[url(/bg-blue.svg)] bg-[url(/bg-purple.svg)] bg-cover bg-[24%_140px] bg-no-repeat rounded-lg">
          <Tabs defaultActiveKey="1" className="w-[90%] custom-ant-tabs-content" items={items} />
        </div>
      </section>
    </Container>
  );
};

export default Explore;
