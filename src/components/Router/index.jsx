import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Explore from '@pages/Explore';
import SongLab from '@pages/SongLab';

import SongProvider from '@context/Song';

import NotFound from '@pages/NotFound';

const router = createBrowserRouter([
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
    path: '*',
    element: <NotFound />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
