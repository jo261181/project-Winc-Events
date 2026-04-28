import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  Image,
  HStack,
  Card,
} from "@chakra-ui/react";

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading…</p>;

  const events = data.events || [];
  const categories = data.categories || [];

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
    <><Box p={6}

      position="fixed"
      inset="0"
      bgImage="url('/images/pexels-diva-34731924.jpg')"
      bgSize="cover"
      bgPosition="center"
      opacity="0.4"
      zIndex="-1" /><Box position="relative" zIndex="1" p={6}>
        <Card.Root maxW="600px" mx="auto" overflow="hidden" p={4}>
          <Image
            src={event.image}
            alt={event.title}
            objectFit="cover"
            width="100%"
            maxH="300px"
            borderRadius="md"
            mb={4} />

          <Card.Body gap="2">
            <Card.Title fontSize="2xl" fontWeight="bold">
              {event.title}
            </Card.Title>

            <Card.Description>
              <Text fontSize="lg" mb={3}>
                {event.description}
              </Text>
            </Card.Description>

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
              {event.categoryIds?.map((catId) => {
                const category = categories.find((c) => c.id === catId);
                return (
                  <Badge key={catId} colorPalette="orange">
                    {category?.name}
                  </Badge>
                );
              })}
            </HStack>
          </Card.Body>

          <Card.Footer gap="2" mt={4}>
            <Button onClick={() => navigate(-1)}>← Back to events</Button>

          </Card.Footer>
        </Card.Root>
      </Box></>
  );
};
