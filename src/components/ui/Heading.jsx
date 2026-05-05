import { Box, Input, Button, Flex, Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";

export default function HeadingExample({
  children,
  data,
  onCreate,
  searchTerm,
  setSearchTerm,
}) {
  const handleCreate = () => setCreateOpen(true);

  const events = Array.isArray(data?.events) ? data.events : [];
  const categories = Array.isArray(data?.categories) ? data.categories : [];

  const filteredEvents =
    searchTerm.trim() === ""
      ? events
      : events.filter((event) => {
          const search = searchTerm.toLowerCase();

          const eventCategoryNames =
            event.categoryIds
              ?.map((id) =>
                categories.find((c) => c.id === id)?.name?.toLowerCase(),
              )
              .filter(Boolean) || [];

          return (
            event.title.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search) ||
            event.location.toLowerCase().includes(search) ||
            eventCategoryNames.some((cat) => cat.includes(search))
          );
        });

  return (
    <Box
      p={6}
      bg="gray.100"
      position="sticky"
      top="0"
      zIndex="sticky"
      boxShadow="sm"
    >
      {/* HEADER STROOK */}
      <Flex
        align="center"
        justify="space-between"
        gap={4}
        flexWrap="wrap"
        mb={4}
      >
        {/* Titel */}
        <Heading size="lg">{children}</Heading>

        {/* Zoekveld */}
        <Input
          maxW="350px"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
        />

        {/* Create button */}
        <Button onClick={onCreate} colorScheme="blue">
          Create new event
        </Button>
      </Flex>

      {/* No results message */}
      {searchTerm.trim() !== "" && filteredEvents.length === 0 && (
        <Text color="gray.500" textAlign="center">
          No Event Found
        </Text>
      )}
    </Box>
  );
}
