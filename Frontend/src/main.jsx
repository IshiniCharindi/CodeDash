import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import EasySection from "./Components/EasySection/EasySection.jsx";
import MediumSection from "./Components/MediumSection/MediumSection.jsx";
import DifficultSection from "./Components/DifficultSection/DifficultSection.jsx";
import UserDashboard from "./Components/UserDashboard/UserDashboard.jsx";
import Admin from "./Components/AdminPanel/Admin.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/easy',
        element: <EasySection />,
    },
    {
        path: '/medium',
        element: <MediumSection />,
    },
    {
        path: '/difficult',
        element: <DifficultSection />,
    },
    {
        path: '/dashboard',
        element: <UserDashboard />,
    },
    {
        path: '/admin',
        element: <Admin />,
    },
]);

// Correct usage of createRoot
createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
