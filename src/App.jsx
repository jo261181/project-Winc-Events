import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import EventForm from "./components/EventForm";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
