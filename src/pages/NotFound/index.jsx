import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';

import logoSrc from '@assets/logo.svg';
import notFoundSvgSrc from '@assets/not_found.svg';

const NotFound = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen min-w-screen">
      <div className="absolute top-0 w-full">
        <nav className="flex w-full px-4 py-6">
          <Link to="/" className="flex">
            <img src={logoSrc} className="h-8 mr-3" alt="Symphony Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Symphony</span>
          </Link>
        </nav>
        <Divider />
      </div>
      <img src={notFoundSvgSrc} alt="Metronome" />
      <h3 className="absolute text-4xl font-bold text-black">404</h3>
      <div className="relative text-center -top-32">
        <p className="mb-3 font-thin">Vaya... Parece que estas fuera de tempo...</p>
        <Link to="/">
          <Button color="secondary">Reajustar tempo</Button>{' '}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
