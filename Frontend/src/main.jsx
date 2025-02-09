import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import EasySection from "./Components/EasySection/EasySection.jsx";
import MediumSection from "./Components/MediumSection/MediumSection.jsx";

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
]);

// Correct usage of createRoot
createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
