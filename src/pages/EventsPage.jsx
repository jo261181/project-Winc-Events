import {
  Heading,
  Image,
  HStack,
  Badge,
  Button,
  Box,
  CardRoot,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  Text
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";

export default function EventsPage() {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

        <ul style={{ listStyle: "none", padding: 0 }}>
          {eventsArray.map((evt) => (
            <li key={evt.id} style={{ marginBottom: "20px" }}>
              <CardRoot
                maxW="400px"
                w="100%"
                p={4}
                borderRadius="xl"
                shadow="md"
                bg="white"
              >
                <CardBody>
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    objectFit="cover"
                    boxSize="200px"
                    borderRadius="md"
                    mb={2}
                  />

                  <CardTitle>{evt.title}</CardTitle>

                  <Text fontSize="sm" color="gray.600" mt={1}>
                    {evt.description}
                  </Text>

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
                </CardBody>

                <CardFooter>
                  <Button>Buy Latte</Button>
                </CardFooter>
              </CardRoot>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
}
