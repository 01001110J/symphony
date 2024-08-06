import { useState, useContext } from 'react';
import { Button, Divider, Input, Tooltip, Spin, Empty } from 'antd';
import { CiChat1 } from 'react-icons/ci';

import { v4 as uuidv4 } from 'uuid';

import { SongContext } from '@context/Song';
import { TokenContext } from '@context/Tokens';

import { getCurrentTime, getSongTitle, getSongFromHg } from '@helpers';

import Header from '@components/Header';
import MusicItem from '@components/MusicItem';
import ChatMessage from '@components/SongLab/ChatMessage';

const suggestionOptions = [
  'lofi slow bpm electro chill with organic samples',
  'classic reggae track with an electronic guitar solo',
  'drum and bass beat with intense percussions',
  '80s electronic track with melodic synthesizers, catchy beat and groovy bass',
];

const SongForm = () => {
  const { hasHuggingToken } = useContext(TokenContext);

  const { setShowSongForm, setSongList } = useContext(SongContext);
  const [promptMessages, setPromptMessages] = useState([]);
  const [promptInput, setPromptInput] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const initialSongConfig = (songUrl) => {
    setShowSongForm(false);
    setSongList([songUrl]);
  };

  const handleMessages = async (message, actor, type = 'message') => {
    setIsInputDisabled(true);
    setPromptMessages((prevMessages) => [
      ...prevMessages,
      {
        actor,
        type,
        message,
        time: getCurrentTime(),
      },
    ]);

    try {
      const [songTitle, category] = await getSongTitle(message);

      const loaderId = uuidv4();

      setPromptMessages((prevMessages) => [
        ...prevMessages,
        {
          id: loaderId,
          tags: [category],
          actor: 'ia-song-track',
          type: 'ia-song-track',
          time: getCurrentTime(),
          loading: true,
        },
      ]);

      const songUrl = await getSongFromHg(message);

      setPromptMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loaderId ? { ...msg, loading: false, src: songUrl, songTitle: songTitle?.replace(/"/g, '') } : msg
        )
      );

      setPromptInput('');
    } catch (error) {
      console.error('Error en handleMessages:', error);
    } finally {
      setIsInputDisabled(false);
    }
  };

  return (
    <section className="flex flex-col flex-wrap h-[calc(100vh-130px)] p-5 lg:flex-row pt-0">
      <Header />
      <Divider className="mt-0" />
      <div className="w-full grid grid-rows-[70px_1fr_auto] flex-1 overflow-hidden rounded-lg glass-morph bg-[url(/bg-blue.svg)] bg-cover bg-[24%_140px] bg-no-repeat h-full">
        <div className="row-start-1 p-5">
          <h3 className="text-2xl dark:text-white">Prompt</h3>
          <Divider className="mt-5" />
        </div>
        {hasHuggingToken ? (
          <>
            <div
              className={`w-full flex flex-col flex-1 row-start-2 px-5 pt-6 overflow-x-hidden overflow-y-auto ${promptMessages.length === 0 && 'grid place-content-center'}`}
            >
              {promptMessages.length === 0 && (
                <Empty description="Envía un prompt para comenzar a crear." className="w-full" />
              )}

              {promptMessages.map((message) => {
                if (message.type === 'message') {
                  return (
                    <ChatMessage
                      key={uuidv4()}
                      isUserMessage={message.actor === 'user'}
                      avatar="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                      name={message.actor === 'user' ? 'User' : 'Symphony'}
                      time={message.time}
                      message={message.message}
                    />
                  );
                }

                if (message.type === 'ia-song-track') {
                  return (
                    <div className="flex flex-col items-start mt-3" key={uuidv4()}>
                      {message.loading && (
                        <div className="flex mb-5">
                          <Spin size="large" />
                          <span className="ml-5 dark:text-white text-custom">
                            Creando canción... Esto toma en promedio 30s.
                          </span>
                        </div>
                      )}

                      <MusicItem
                        songUrl={message.src}
                        title={message.songTitle}
                        userName="Symphony IA"
                        tags={message.tags}
                        loading={message.loading}
                        changeSize={false}
                        onPlayNext={initialSongConfig}
                      />
                    </div>
                  );
                }
              })}
            </div>

            <div className="row-start-3 px-5 pb-5 place-content-center">
              {promptMessages.length === 0 && (
                <div className="flex flex-col">
                  <p className="pl-3 mb-3 dark:text-white text-custom">¿Sin ideas? Aquí unas recomendaciones:</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {suggestionOptions.map((suggestion) => (
                      <Button
                        key={uuidv4()}
                        className="ml-3"
                        variant="bordered"
                        disabled={isInputDisabled}
                        onClick={() => handleMessages(suggestion, 'user')}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                  <Divider />
                </div>
              )}
              <div className="flex px-3">
                <Input
                  placeholder="Describe la canción de tus sueños"
                  disabled={!hasHuggingToken || isInputDisabled}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                />
                <Tooltip content="Pedir una nueva pista..." placement="right">
                  <Button
                    className="ml-3"
                    variant="bordered"
                    disabled={isInputDisabled}
                    onClick={() => handleMessages(promptInput, 'user')}
                  >
                    <CiChat1 />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </>
        ) : (
          <p className="grid w-full h-full text-2xl text-orange-700 bg-orange-200 place-content-center">
            Para poder disfrutar de las opciones debes de proveer un token de Hugging face.
          </p>
        )}
      </div>
    </section>
  );
};

export default SongForm;
