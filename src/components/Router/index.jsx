import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Auth from '@pages/Auth';
import About from '@pages/About';
import Explore from '@pages/Explore';
import SongLab from '@pages/SongLab';
import Playlist from '@pages/Playlist';
import Feedback from '@pages/Feedback';

import SongProvider from '@context/Song';

import NotFound from '@pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Explore />,
  },
  {
    path: '/song/new',
    element: (
      <SongProvider>
        <SongLab />
      </SongProvider>
    ),
  },
  {
    path: '/liked-songs',
    element: <Playlist />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/feedback',
    element: <Feedback />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
