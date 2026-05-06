import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Toaster } from "@chakra-ui/react";

export const Root = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading…</p>;

  return (
    <Box>
      <Toaster />   
      <Navigation />
      <Outlet context={{ data, setData }} />
    </Box>
  );
};

