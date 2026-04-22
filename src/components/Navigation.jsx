import { Flex, Link, Button, Heading } from "@chakra-ui/react";
import SimpleModal from "../components/ui/modal";
import { useState } from 'react';

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
        </SimpleModal>
        <Button onClick={() => setModalOpen(true)}>Create Event</Button>
      </Flex>
    </nav>
  );
};
