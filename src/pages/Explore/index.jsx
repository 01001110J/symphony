import { useState } from 'react';
import { Tabs, Modal, Divider } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '@hooks';
import Stars from '@layouts/Stars';
import Container from '@layouts/Container';

import Settings from '@pages/Settings';
import Logo from '@components/Header/Logo';
import MusicItem from '@components/MusicItem';
import DropDown from '@components/Header/DropDown';

const images = [
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg', category: 'Rock' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg', category: 'Jazz' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg', category: 'Classical' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg', category: 'Electronic' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg', category: 'Hip Hop' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg', category: 'Blues' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg', category: 'Pop' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg', category: 'Reggae' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg', category: 'Country' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg', category: 'Metal' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg', category: 'Folk' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg', category: 'Indie' },
];

const MasonryGrid = ({ handleOpenModal }) => {
  const columns = [images.slice(0, 3), images.slice(3, 6), images.slice(6, 9), images.slice(9)];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {columns.map((column, colIndex) => (
        <div className="grid gap-4" key={colIndex}>
          {column.map(({ src, category }, index) => (
            <article
              key={index}
              className="relative overflow-hidden transition animate-fadeIn hover:cursor-pointer hover:scale-105 h-fit"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleOpenModal(category)}
            >
              <img
                className="h-auto max-w-full rounded-lg"
                src={src}
                alt={`Masonry image ${colIndex * 3 + index + 1}`}
              />
              <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full">
                <p>{category}</p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
            </article>
          ))}
        </div>
      ))}
    </div>
  );
};

MasonryGrid.propTypes = {
  handleOpenModal: PropTypes.func,
};

const trackList = Array(10)
  .fill()
  .map((_, index) => index + 1);

const Songs = () => (
  <div className="music-list-container ant-tabs-content">
    {trackList.map((track, index) => (
      <div className="music-item" style={{ '--position': index + 1 }} key={'song-' + track}>
        <MusicItem />
      </div>
    ))}
  </div>
);

const initialModalState = {
  isOpen: false,
  category: '',
};

const Explore = () => {
  const isAuthenticated = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const handleModal = (category) => {
    setIsModalOpen({
      isOpen: !isModalOpen.isOpen,
      category,
    });
  };

  const items = [
    {
      key: '1',
      label: 'Canciones',
      children: <Songs />,
    },
    {
      key: '2',
      label: 'Tags',
      children: <MasonryGrid handleOpenModal={handleModal} />,
    },
    {
      key: '3',
      label: 'Settings',
      children: <Settings />,
    },
  ];

  return (
    <Container>
      <Stars />
      <nav className="absolute top-0 left-0 z-20 flex items-center justify-between w-full p-6">
        <Logo />
        <DropDown />
      </nav>
      <section className="flex flex-col w-full h-full md:flex-row">
        <div className="flex flex-col justify-center flex-1 min-h-screen pt-20 lg:pt-0 back-gradient">
          <div className="px-6 lg:px-0 lg:pl-20">
            <h1 className="flex flex-col mb-5 text-4xl font-extrabold text-white sm:text-7xl">
              Let us help you discover the
              <strong className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-7xl">
                {' '}
                Symphony of Your Soul.{' '}
              </strong>
            </h1>

            <p className="max-w-lg mt-4 leading-5 text-white">
              Symphony allows you to create unique songs for your artistic work. With our advanced AI, you can generate
              personalized tracks, add, delete, and merge multiple audio tracks.
            </p>
            <div className="flex flex-wrap gap-4 pb-6 mt-8 lg:pb-0">
              <Link
                className="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                to={isAuthenticated ? '/song/new' : '/auth'}
              >
                {isAuthenticated ? 'Get Started' : 'Login'}
              </Link>

              <a
                className="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="min-h-screen flex flex-col pt-6 lg:pt-0 h-fit items-center justify-center flex-1 backdrop-blur-md relative bg-[url(/bg-blue.svg)] bg-cover bg-[24%_140px] bg-no-repeat rounded-lg">
          <Tabs defaultActiveKey="1" className="w-[90%] custom-ant-tabs-content" items={items} />
        </div>
      </section>
      <Modal
        title={isModalOpen.category}
        open={isModalOpen.isOpen}
        onOk={() => setIsModalOpen(initialModalState)}
        onCancel={() => setIsModalOpen(initialModalState)}
      >
        <Divider />
        <div className="flex flex-col items-center pt-5 justify-items-center min-w-96">
          <MusicItem />
          <MusicItem />
          <MusicItem />
          <MusicItem />
          <MusicItem />
        </div>
      </Modal>
    </Container>
  );
};

export default Explore;
