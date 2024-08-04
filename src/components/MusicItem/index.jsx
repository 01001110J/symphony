import { Tag } from 'antd';

import playLogo from '@assets/logo-white.svg';

const MusicItem = () => {
  return (
    <article className="w-[90%] mb-4 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] hover:scale-105">
      <div className="rounded-[10px] bg-white p-4 sm:p-6 dark:bg-slate-950">
        <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">Sunset Dance on the Beach</h3>
        <span className="block text-xs text-gray-500">Sam Sepiol</span>
        <div className="flex items-end justify-between h-fit">
          <div className="flex flex-wrap gap-1 mt-4">
            <Tag color="purple">Pop</Tag>
            <Tag color="purple">Pop</Tag>
            <Tag color="purple">Pop</Tag>
          </div>
          <img src={playLogo} alt="" />
        </div>
      </div>
    </article>
  );
};

export default MusicItem;
