import {
  Card,
  Heading,
  Image,
  HStack,
  Badge,
  Button,
  Box,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import SimpleModal from "../components/ui/modal";


export const EventsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ⭐ addEvent staat nu op de juiste plek
  async function addEvent(newEvent) {
    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    // voeg toe aan state
    setData((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));

    setModalOpen(false);
  }

  useEffect(() => {
    fetch("events.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const eventsArray = Array.isArray(data) ? data : data?.events || [];
  const categories = data?.categories || [];

  return (
    <>
      {/* Achtergrond */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        zIndex="-1"
        opacity="0.4"
      />

      {/* Content */}
      <Box position="relative" zIndex="1" p={6}>
        <Heading mb={4}>List of events</Heading>

        <Button mb={4} onClick={() => setModalOpen(true)}>
          Nieuw evenement toevoegen
        </Button>

        <SimpleModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Nieuw evenement"
>
  <Box
    as="form"
    onSubmit={(e) => {
      e.preventDefault();

      const form = new FormData(e.target);

      const newEvent = {
        title: form.get("title"),
        description: form.get("description"),
        image: form.get("image"),
        location: form.get("location"),
        startTime: form.get("startTime"),
        endTime: form.get("endTime"),
        categoryIds: form.getAll("categoryIds").map(Number),
      };

      addEvent(newEvent);
    }}
  >
    <label>Titel</label>
    <input name="title" required />

    <label>Beschrijving</label>
    <input name="description" required />

    <label>Locatie</label>
    <input name="location" required />

    <label>Afbeelding URL</label>
    <input name="image" required />

    <label>Starttijd</label>
    <input type="datetime-local" name="startTime" required />

    <label>Eindtijd</label>
    <input type="datetime-local" name="endTime" required />

    <label>Categorieën</label>
    <Box display="flex" flexDir="column" gap={1}>
      {categories.map((cat) => (
        <label key={cat.id}>
          <input type="checkbox" name="categoryIds" value={cat.id} />
          {cat.name}
        </label>
      ))}
    </Box>

    <Button type="submit" mt={4}>
      Opslaan
    </Button>
  </Box>
</SimpleModal>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {eventsArray.map((evt) => (
            <li key={evt.id} style={{ marginBottom: "20px" }}>
              <Card.Root
                maxW="400px"
                w="100%"
                p={4}
                borderRadius="xl"
                shadow="md"
                bg="white"
              >
                <Image
                  src={evt.image}
                  alt={evt.title}
                  objectFit="cover"
                  boxSize="200px"
                  borderRadius="md"
                  mb={2}
                />

                <p>
                  <strong>{evt.title}</strong>
                </p>

                <Card.Description>
                  <p>{evt.location}</p>
                  <p>{evt.description}</p>

                  {new Date(evt.startTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  {" – "}
                  {new Date(evt.endTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}

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
                </Card.Description>

                <Card.Footer mt={4}>
                  <Button>Buy Latte</Button>
                </Card.Footer>
              </Card.Root>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default EventsPage;
