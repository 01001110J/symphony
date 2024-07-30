import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";

import Auth from "@pages/Auth";
import Profile from "@pages/Profile";
import Explore from "@pages/Explore";
import SongLab from "@pages/SongLab";
import Playlist from "@pages/Playlist";
import Feedback from "@pages/Feedback";
import About from "@pages/About";

import NotFound from "@pages/NotFound";


const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/explore",
        element: <Explore />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/song/new",
        element: <SongLab />,
    },
    {
        path: "/song/details/:songId",
        element: <Profile />,
    },
    {
        path: "/liked-songs",
        element: <Playlist />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/feedback",
        element: <Feedback />,
    },
    {
        path: "/",
        element: <Navigate to="/explore" />,
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

const Router = () => <RouterProvider router={router} />

export default Router
