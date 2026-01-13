import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./root.jsx";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Contact from "./Contact.jsx";
import Login from "./login.jsx";
import Namirnice from "./namirnice.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        middleware: [() => redirectMiddleware("/", "/home/")],
        children: [
            {
                path: "home/",
                Component: App
            },
            {
                path: "contact/",
                Component: Contact
            },
            {
                path: "login/",
                Component:Login
            },
            {
                path: "namirnice/",
                Component:Namirnice
            },
        ],
        ErrorBoundary: ErrorPage
    },
]);

function redirectMiddleware(from, to) {
    if (window.location.pathname != from) return;
    window.location.replace(to);
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);
