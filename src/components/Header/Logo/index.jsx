import { useContext } from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import { useHideElement } from '@hooks';
import { DarkThemeContext } from '@context/DarkTheme';

import logoWhiteSrc from '@assets/logo.svg';
import logoDarkSrc from '@assets/logo-white.svg';

const Logo = () => {
  const hideClass = useHideElement();
  const { isDarkMode } = useContext(DarkThemeContext);
  return (
    <div className="flex flex-wrap items-center ml-0 md:ml-5">
      <div>
        <div className="flex items-center justify-start">
          <Link to="/" className="flex items-center justify-between mr-4">
            <img src={isDarkMode ? logoDarkSrc : logoWhiteSrc} className="h-8 mr-3" alt="Symphony Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Symphony</span>
          </Link>
          <form action="#" method="GET" className={`hidden ml-[56px] md:block md:pl-2 ${hideClass}`}>
            <div className="hidden md:w-96">
              <Input type="text" placeholder="Crea la canción de tus sueños. Solo descríbela." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Logo;
