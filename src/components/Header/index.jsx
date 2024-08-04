import Logo from '@components/Header/Logo';
import DropDown from '@components/Header/DropDown';

const Header = () => (
  <header className="z-30 flex justify-between w-full py-5 h-fit dark:bg-gray-900">
    <Logo />
    <DropDown />
  </header>
);

export default Header;
