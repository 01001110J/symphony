import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";

import Auth from "@pages/Auth";
import Profile from "@pages/Profile";
import Explore from "@pages/Explore";
import NotFound from "@pages/NotFound";


const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth />,
        exact: true
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
