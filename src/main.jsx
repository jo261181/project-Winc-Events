import React from "react";
import ReactDOM from "react-dom/client";
import EventPage from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,          // homepage = /events
        element: <EventsPage />,
      },
      {
        path: "events",       // zelfde pagina, maar expliciet bereikbaar via /events
        element: <EventsPage />,
      },
      {
        path: "events/:id",   // detailpagina
        element: <EventPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);