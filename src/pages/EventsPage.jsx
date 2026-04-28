import {
  // Heading,
  Image,
  HStack,
  Badge,
  Button,
  Box,
  Text,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";
import Heading from "../components/ui/Heading";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";

export const EventsPage = () => {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();

  // Fetch events.json
  useEffect(() => {
    fetch("events.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading…</p>;

  const eventsArray = data.events || [];
  const categories = data.categories || [];

  // Filtering
  const filteredEvents = eventsArray.filter((evt) => {
    const search = searchTerm.toLowerCase();

    const categoryMatch = evt.categoryIds?.some((id) => {
      const category = categories.find((c) => c.id === id);
      return category?.name.toLowerCase().includes(search);
    });

    return (
      evt.id.toString().toLowerCase().includes(search) ||
      evt.description?.toLowerCase().includes(search) ||
      categoryMatch
    );
  });

  // Add event
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

  return (
    <>
      {/* Background */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
        
      />

      {/* Content */}
      <Box position="relative" zIndex="1" p={6}>
        <Heading mb={4}>List of events</Heading>

        <Button mb={4} onClick={() => setModalOpen(true)}>
          Create new event
        </Button>

        {/* Modal */}
        <SimpleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create new event"
        >
          <EventForm categories={categories} addEvent={addEvent} />
        </SimpleModal>

        {/* Grid */}
        <SimpleGrid
          columns={[1, 2, null, 3]} // array syntax
          spacing={6}
          gap="30px"
        >
          {filteredEvents.map((evt) => (
            <Card.Root
              key={evt.id}
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
                  width="100%"
                  borderRadius="md"
                  mb={3}
                  objectFit="cover"
                  maxH="300px"
                  mb={4} 
                />

                <Card.Title>{evt.title}</Card.Title>
                <Card.Description>{evt.description}</Card.Description>
              </Card.Header>

              <Card.Body>
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
