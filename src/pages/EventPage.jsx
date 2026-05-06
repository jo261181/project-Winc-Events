import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Badge,
  Button,
  Image,
  HStack,
  Card,
} from "@chakra-ui/react";

import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // -----------------------------
  // ALWAYS LOAD FROM events.json
  // -----------------------------
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
        <Text>Event not found</Text>
        <Button mt={4} onClick={() => navigate("/events")}>
          Go back
        </Button>
      </Box>
    );
  }

  // -----------------------------
  // DELETE EVENT (in-memory only)
  // -----------------------------
  function handleDelete() {
    const updated = {
      ...data,
      events: data.events.filter((e) => e.id !== event.id),
    };

    setData(updated);
    setDeleteOpen(false);
    navigate("/events");
  }

  // -----------------------------
  // EDIT EVENT (in-memory only)
  // -----------------------------
  function handleEditSubmit(values) {
    const updated = {
      ...data,
      events: data.events.map((e) =>
        e.id === event.id ? { ...e, ...values } : e
      ),
    };

    setData(updated);
    setEditOpen(false);
  }

  return (
    <>
      <Box
        p={6}
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      <Box position="relative" zIndex="1" p={6}>
        <Card.Root maxW="600px" mx="auto" overflow="hidden" p={4}>
          <Image
            src={event.image}
            alt={event.title}
            maxH="300px"
            borderRadius="md"
            mb={4}
            h={{ base: "200px", md: "300px", lg: "400px" }}
            w="100%"
            objectFit="cover"
          />

          <Card.Body gap="2">
            <Card.Title fontSize="2xl" fontWeight="bold">
              {event.title}
            </Card.Title>

            <Card.Description fontSize="lg" mb={3}>
              {event.description}
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
            <Button onClick={() => setEditOpen(true)}>Edit Event</Button>
            <Button colorScheme="red" onClick={() => setDeleteOpen(true)}>
              Delete Event
            </Button>
            <Button onClick={() => navigate("/events")}>← Back to events</Button>
          </Card.Footer>
        </Card.Root>
      </Box>

      <SimpleModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit event"
      >
        <EventForm
          initialEvent={event}
          onSubmit={handleEditSubmit}
          cancel={() => setEditOpen(false)}
        />
      </SimpleModal>

      <SimpleModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete event?"
      >
        <Text mb={4}>Weet je zeker dat je dit event wilt verwijderen?</Text>

        <Button colorScheme="red" width="full" onClick={handleDelete}>
          Yes, delete
        </Button>

        <Button
          variant="ghost"
          width="full"
          mt={2}
          onClick={() => setDeleteOpen(false)}
        >
          Cancel
        </Button>
      </SimpleModal>
    </>
  );
}
