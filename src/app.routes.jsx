import { createBrowserRouter } from "react-router";

import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";
import Profile from "./features/user/pages/Profile";
import Home from "./features/home/pages/Home";
import About from "./features/home/pages/About";
import Library from "./features/home/pages/Library";


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },

      {
      path: "/profile",
      element: (
        <Protected>
            <Profile />
        </Protected>
    ),
    },

    {
    path: "/about",
    element: (
        <Protected>
            <About />
        </Protected>
    ),
},

    {
        path: "/library",
        element: (
            <Protected>
                <Library />
            </Protected>
        ),
    },

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/register",
        element: <Register />,
    },
]);