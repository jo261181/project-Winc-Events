import { Flex, Link, Button, Heading, Input } from "@chakra-ui/react";
import SimpleModal from "../components/ui/modal";
import { useState } from 'react';
import { Form } from "react-router";

export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav>
      <Flex gap={2}>
        <Link href="/">Events</Link>
        <SimpleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="New Event"
        >
          <Heading>Hello World!</Heading>
          <Form
            method="post"
            action="/events/new"
          >
            <Input name="title" placeholder="Event Title" />
            <Input name="description" placeholder="Event Description" />
            <Input name="date" placeholder="Event date" />
            <Input name="starttime" placeholder="Event start time" />
            <Input name="endtime" placeholder="Event end time" />
            <Button type="submit">Submit</Button>
          </Form>
        </SimpleModal>
        <Button onClick={() => setModalOpen(true)}>Create Event</Button>
      </Flex>
    </nav>
  );
};
