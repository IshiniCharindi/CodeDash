import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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