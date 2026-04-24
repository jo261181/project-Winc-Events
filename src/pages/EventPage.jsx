import { useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import {Navigation} from "../components/Navigation";

export function EventPage() {
  const { eventId } = useParams();

  return (
    <Box p={6}>
      <Heading>Event details</Heading>
      <Text mt={4}>Event ID: {eventId}</Text>
    </Box>
  );
}
