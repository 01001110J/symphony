import { CiHeart, CiChat1, CiCircleInfo } from 'react-icons/ci';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';

const { Sider } = Layout;

const routes = [
  {
    key: 'menu-side-1',
    label: 'Liked songs',
    path: '/liked-songs',
    icon: <CiHeart />,
  },
  {
    key: 'menu-side-2',
    label: 'Make your own song',
    path: '/song/new',
    icon: <CiChat1 />,
  },
];

const handleOnClick = (e) => {
  console.log(e);
};

const SideBar = ({ isCollapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed} className="h-full">
      <Menu mode="inline" items={routes} onClick={handleOnClick} className="h-full" />
      <Menu
        onClick={handleOnClick}
        mode="inline"
        items={[
          {
            key: 'sub-menu-side-1',
            label: 'About',
            path: '/about',
            icon: <CiCircleInfo />,
          },
        ]}
      />
    </Sider>
  );
};

SideBar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
};

export default SideBar;
