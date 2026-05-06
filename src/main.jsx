import React from "react";
import ReactDOM from "react-dom/client";
import EventPage from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",          // root layout
    element: <Root />,
    children: [
      {
        path: "events",     // lijstpagina
        element: <EventsPage />,
      },
      {
        path: "events/:id", // detailpagina
        element: <EventPage />,
      },
      {
        index: true,        // als iemand / bezoekt → redirect naar /events
        element: <EventsPage />,
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