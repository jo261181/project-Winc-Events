import { Flex, Link, Button, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SimpleModal from "../components/ui/modal";
import { useState } from "react";



export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav>
      <Flex gap={2} align="center">
        {/* React Router link */}
        <Link as={RouterLink} to="/">
          Events
        </Link>

        {/* Modal */}
        <SimpleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="New Event"
        >
          {/* Correct Chakra button */}
          <Button onClick={() => setModalOpen(true)}>Create a new Event</Button>
        </SimpleModal>
      </Flex>
    </nav>
  );
};
