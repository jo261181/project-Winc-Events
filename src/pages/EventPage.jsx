import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Badge, Button, Image, HStack } from "@chakra-ui/react";

export const EventPage = () => {
  const { id } = useParams(); // ID uit URL
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  // Fetch events.json opnieuw (EventPage staat los van EventsPage)
  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading…</p>;

  const events = data.events || [];
  const categories = data.categories || [];

  // Zoek het juiste event
  const event = events.find((evt) => evt.id.toString() === id);

  if (!event) {
    return (
      <Box p={6}>
        <Heading>Event not found</Heading>
        <Button mt={4} onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Button mb={4} onClick={() => navigate(-1)}>
        ← Back to events
      </Button>

      <Heading mb={4}>{event.title}</Heading>

      <Image
        src={event.image}
        alt={event.title}
        objectFit="cover"
        width="100%"
        maxH="300px"
        borderRadius="md"
        mb={4}
      />

      <Text fontSize="lg" mb={3}>
        {event.description}
      </Text>

      <Text fontWeight="bold" mt={2}>
        Location: {event.location}
      </Text>

      <Text mt={2}>
        {new Date(event.startTime).toLocaleString("nl-NL", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
        {" – "}
        {new Date(event.endTime).toLocaleString("nl-NL", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Text>

      <HStack mt={4}>
        {event.categoryIds?.map((id) => {
          const category = categories.find((c) => c.id === id);
          return (
            <Badge key={id} colorPalette="orange">
              {category?.name}
            </Badge>
          );
        })}
      </HStack>
    </Box>
  );
};
