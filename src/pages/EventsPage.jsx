import {
  Heading,
  Image,
  HStack,
  Badge,
  Button,
  Box,
  Text,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";

export const EventsPage = () => {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  async function addEvent(newEvent) {
    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    setData((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));

    setModalOpen(false);
  }

  useEffect(() => {
    fetch("events.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading…</p>;

  const eventsArray = data.events || [];
  const categories = data.categories || [];

  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      <Box position="relative" zIndex="1" p={6}>
        <Heading mb={4}>List of events</Heading>

        <Button mb={4} onClick={() => setModalOpen(true)}>
          Create new event
        </Button>

        <SimpleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create new event"
        >
          <EventForm categories={categories} addEvent={addEvent} />
        </SimpleModal>

        <SimpleGrid
          columns={2}
          gap="30px"
          columns={{ base: 1, sm: 2, lg: 3 }}
          spacing={6}
          
        >
          {eventsArray.map((evt) => (
            <Card.Root
              key={evt.id}
              // maxW="lg"
              w="100%"
              borderRadius="lg"
              shadow="lg"
              bg="white"
              alignItems="center"
              mb={5}
            >
              <Card.Header>
                <Image
                  src={evt.image}
                  alt={evt.title}
                  objectFit="cover"
                  boxSize="250px"
                  boxwidth="100%"
                  borderRadius="md"
                  mb={3}
                  
                />

                <Card.Title>{evt.title}</Card.Title>
                <Card.Description>{evt.description} </Card.Description>
              </Card.Header>

              <Card.Body>
                <Box
                  alignItems="center"
                  flexDirection={{ base: "column", sm: "row" }}
                  
                ></Box>
                <Text mt={1}>{evt.location}</Text>

                <Text mt={1}>
                  {new Date(evt.startTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  {" – "}
                  {new Date(evt.endTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>

                <HStack mt={4}>
                  {evt.categoryIds?.map((id) => {
                    const category = categories.find((c) => c.id === id);
                    return (
                      <Badge key={id} colorPalette="orange">
                        {category?.name}
                      </Badge>
                    );
                  })}
                </HStack>
              </Card.Body>

              <Card.Footer gap={3}>
                <Button onClick={() => navigate(`/event/${evt.id}`)}>
                  View details
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
