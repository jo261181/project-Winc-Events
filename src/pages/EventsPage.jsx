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

  // ⭐ Modal state moet HIER staan
  const [modalOpen, setModalOpen] = useState(false);

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
                      return <Badge key={id} colorPalette = "orange">{category?.name}</Badge>;
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
