import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
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
  const { data, setData } = useOutletContext();
  const toast = useToast();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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

  function handleDelete() {
    const updated = {
      ...data,
      events: data.events.filter((e) => e.id !== event.id),
    };

    setData(updated);
    setDeleteOpen(false);
    navigate("/events");

    toast({
      title: "Event verwijderd",
      description: `"${event.title}" is succesvol verwijderd.`,
      status: "success",
    });
  }

  function handleEditSubmit(values) {
    const updated = {
      ...data,
      events: data.events.map((e) =>
        e.id === event.id ? { ...e, ...values } : e
      ),
    };

    setData(updated);
    setEditOpen(false);

    toast({
      title: "Event aangepast",
      description: `"${values.title}" is succesvol aangepast.`,
      status: "success",
    });
  }

  return (
    <>
      {/* jouw UI blijft hetzelfde */}
    </>
  );
}
