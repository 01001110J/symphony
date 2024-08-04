import { useState } from 'react';

import { Button, Divider, Input, Tooltip } from 'antd';
import { CiChat1 } from 'react-icons/ci';

import MusicItem from '@components/MusicItem';
import Header from '@components/Header';

const categories = [
  { id: 1, name: 'Jazz', gridArea: '1 / 1 / 2 / 2' },
  { id: 2, name: 'Metal', gridArea: '1 / 2 / 2 / 4' },
  { id: 3, name: 'Pop', gridArea: '1 / 4 / 2 / 5' },
  { id: 4, name: 'Reggae', gridArea: '2 / 1 / 3 / 3' },
  { id: 5, name: 'Cumbia', gridArea: '2 / 3 / 3 / 5' },
  { id: 6, name: 'Classical', gridArea: '3 / 1 / 4 / 2' },
  { id: 7, name: 'Electronic', gridArea: '3 / 2 / 4 / 5' },
];

const genres = [
  { id: 1, name: 'Rock', gridArea: '1 / 1 / 2 / 2' },
  { id: 2, name: 'Hip Hop', gridArea: '1 / 2 / 2 / 4' },
  { id: 3, name: 'R&B', gridArea: '1 / 4 / 2 / 5' },
  { id: 4, name: 'Country', gridArea: '2 / 1 / 3 / 3' },
  { id: 5, name: 'Blues', gridArea: '2 / 3 / 3 / 5' },
  { id: 6, name: 'Funk', gridArea: '3 / 1 / 4 / 2' },
  { id: 7, name: 'Salsa', gridArea: '3 / 2 / 4 / 5' },
];

const SongForm = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleButtonClick = (item, setSelected) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.includes(item);
      const canAddMore = prevSelected.length < 3;

      if (isSelected) {
        return prevSelected.filter((b) => b !== item);
      }

      if (canAddMore) {
        return [...prevSelected, item];
      }

      return prevSelected;
    });
  };

  const renderButtons = (items, selected, setSelected) => (
    <div
      className="grid flex-1 gap-2 mb-4"
      style={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, minmax(50px, auto))',
      }}
    >
      {items.map((item) => (
        <Button
          key={item.id}
          className={`w-full h-full flex items-center justify-center text-orange-300 border-2 border-orange-300 ${selected.includes(item.name) ? 'bg-orange-300 text-white' : ''
            }`}
          style={{ gridArea: item.gridArea }}
          onClick={() => handleButtonClick(item.name, setSelected)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );

  return (
    <section className="flex flex-col flex-wrap h-[calc(100vh-130px)] p-5 lg:flex-row pt-0">
      <Header />
      <Divider className="mt-0" />
      <div className="flex flex-col flex-1 p-5 rounded-lg md:mr-5 glass-morph bg-[url(/bg-purple.svg)] bg-cover bg-[24%_140px] bg-no-repeat">
        <h2 className="text-2xl text-white ">Categories</h2>
        <Divider />
        {renderButtons(categories, selectedCategories, setSelectedCategories)}
        <h2 className="text-2xl text-white ">Géneros</h2>
        <Divider />
        {renderButtons(genres, selectedGenres, setSelectedGenres)}
      </div>
      <div className="grid grid-rows-[70px_1fr_50px] flex-1 overflow-hidden rounded-lg glass-morph bg-[url(/bg-blue.svg)] bg-cover bg-[24%_140px] bg-no-repeat h-full">
        <div className="row-start-1 p-5">
          <h3 className="text-2xl text-white">Prompt</h3>
          <Divider className="mt-5" />
        </div>
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
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                a catchy beat for a podcast intro.
              </p>
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
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">Of course, here is the result.</p>
            </div>
          </div>
          <MusicItem
            songUrl="https://ai.honu.io/papers/musicgen/samples/musicgen/015_sample.mp3"
            title="Echoes of Emotion"
            userName="Sam Sepiol"
            tags={['rock']}
            changeSize={false}
          />
        </div>
        {/* Fin chat */}
        <div className="row-start-3 place-content-center">
          <div className="flex px-3">
            <Input placeholder="Describe la canción de tus sueños" />
            <Tooltip content="Pedir una nueva pista..." placement="right">
              <Button className="ml-3" variant="bordered">
                <CiChat1 />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SongForm;
