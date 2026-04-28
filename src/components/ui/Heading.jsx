import { Box, Heading } from "@chakra-ui/react";

export default function HeadingExample() {
  return (
    <>
      <Box
        position="sticky"
        top="0"
        bg="blue.500"
        zIndex="sticky" // Uses Chakra's zIndex.sticky (1100)
        boxShadow="sm"
      >
        <Heading>Sticky Heading</Heading>
      </Box>
    </>
  );
}
