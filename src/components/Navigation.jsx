import { Flex, Link, Button, Heading, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SimpleModal from "../components/ui/modal";
import { useState } from "react";
import HeadingExample from "../components/ui/Heading";
import EventForm from "../components/ui/EventForm";

export const Navigation = ({ categories, addEvent }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HeadingExample>
        <Flex gap={8} align="center">
          <Heading>
            <Flex align="center">
              <Image
                src="/images/logo.png"
                alt="Winc Events"
                height={{ base: "190px", sm: "200px", md: "220px", lg: "250px" }}   // responsive
                ml={2} // margin-left
                objectFit="contain"
                mt={6}
              />
            </Flex>
          </Heading>

          <Button mb={1} onClick={() => setModalOpen(true)}>
            Create new event
          </Button>
        </Flex>
      </HeadingExample>

      {/* Modal */}
      <SimpleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create a new event"
      >
        <EventForm categories={categories} addEvent={addEvent} />
      </SimpleModal>
    </>
  );
};
