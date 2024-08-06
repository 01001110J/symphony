import { useState } from 'react';
import { Input, Button, Empty } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import ChatMessage from '@components/SongLab/ChatMessage';
import { getSongLyrics, getCurrentTime } from '@helpers';

const Composer = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLyrics = () => {
    setIsDisabled(true);

    getSongLyrics(inputValue)
      .then((response) => {
        const songParts = response.map((part) => ({
          author: 'ia',
          text: part,
        }));

        setMessages([
          ...messages,
          {
            author: 'user',
            text: inputValue,
          },
          ...songParts,
        ]);
        setInputValue('');
      })
      .finally(() => setIsDisabled(false));
  };

  return (
    <div className="grid grid-rows-[50px_auto_50px] h-full bg-slate-200 dark:bg-slate-900 rounded-xl p-3 dark:text-white">
      <div className="row-start-1">
        <h3 className="flex items-center my-3 text-lg font-bold">Prompt</h3>
      </div>
      <div
        className={`flex flex-col h-full row-start-2 px-5 pt-6 overflow-x-hidden overflow-y-auto max-h-[800px] ${messages.length === 0 && 'grid place-content-center'}`}
      >
        {messages.length === 0 && <Empty className="my-5" />}
        {messages.map((message) => (
          <ChatMessage
            key={uuidv4()}
            isUserMessage={message.author === 'user'}
            showAvatar={false}
            name={message.author === 'user' ? 'User' : 'Symphony IA'}
            time={getCurrentTime()}
            message={message.text}
          />
        ))}
      </div>
      <div className="flex items-center row-start-3 gap-3">
        <Input
          disabled={isDisabled}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full h-fit"
        />
        <Button disabled={inputValue.length < 15 || isDisabled} onClick={handleLyrics}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default Composer;
