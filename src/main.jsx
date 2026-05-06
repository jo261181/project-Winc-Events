import React from "react";
import ReactDOM from "react-dom/client";
import EventPage from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastProvider } from "@chakra-ui/toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <EventsPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ChakraProvider>
  </React.StrictMode>
);
