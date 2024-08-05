import PropTypes from 'prop-types';

const ChatMessage = ({ isUserMessage, avatar, name, time, message }) => {
  return (
    <div className={`flex items-start gap-2.5 mb-5 ${isUserMessage ? 'flex-row-reverse' : ''}`}>
      <img className="w-8 h-8 rounded-full" src={avatar} alt={name} />
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 
          ${isUserMessage ? 'rounded-tl-xl rounded-bl-xl rounded-br-xl' : 'rounded-e-xl rounded-es-xl'} 
          dark:bg-gray-700`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{time}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  isUserMessage: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ChatMessage;
