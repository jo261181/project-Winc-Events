import { Box, Heading } from "@chakra-ui/react";

export default function HeadingExample({ children }) {
  return (
    <>
<Box
  position="sticky"
  top="0"
  width="100%"
  backgroundColor="gray.100"
  zIndex="sticky"
  boxShadow="sm"
  h={{ base: "90px", sm: "110px", md: "130px" }}
  display="flex"
  alignItems="center"
 
  px={6}
>
  {children}
</Box>
    </>
  );
}
