import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import UserDashboard from './Components/UserDashboard/UserDashboard.jsx';
import HomePage from './Components/Home/HomePage.jsx';
import PracticePage from './Components/Home/PracticePage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/dashboard',
        element: <UserDashboard />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/practice',
        element: <PracticePage />,
    },
]);

const root = document.getElementById('root');

if (root) {
    createRoot(root).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found!");
}