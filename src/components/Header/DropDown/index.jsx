import { Avatar, Dropdown } from 'antd';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks';

const DropDown = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const logOut = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const dropDownItems = [
    {
      key: '0',
      label: 'Crea tu nuevo hit',
      onclick: () => navigate('/song/new'),
    },
    {
      key: '2',
      label: 'Feedback',
      onClick: () => navigate('/feedback'),
    },
    {
      key: '3',
      danger: true,
      label: 'Log Out',
      onClick: logOut,
    },
  ];

  return (
    <div>
      {isAuthenticated ? (
        <Dropdown menu={{ items: dropDownItems }} className="md:mr-10">
          <Avatar
            className="hover:cursor-pointer"
            src={
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png" alt="avatar" />
            }
            size={'large'}
          />
        </Dropdown>
      ) : (
        <Link to="/auth" className="p-3 rounded-lg text-white bg-[#11181C] w-fit">
          Login
        </Link>
      )}
    </div>
  );
};

export default DropDown;
