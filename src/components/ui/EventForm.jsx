import {
  Button,
  Card,
  
  Field,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export default function EventForm({ cancel }) {
  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <Card.Title>Create Event</Card.Title>
        <Card.Description>
          Fill in the form below to create an event
        </Card.Description>
      </Card.Header>

      <CardBody>
        <Stack gap="4" w="full">
          <Field.Root>
            <Field.Label>Event Name</Field.Label>
            <Input name="title" required />
          </Field.Root>

          <Field.Root>
            <Field.Label>Event Description</Field.Label>
            <Textarea
              name="description"
              placeholder="Write your event..."
              required
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Startdate and Time</Field.Label>
            <Input type="datetime-local" name="startTime" required />
          </Field.Root>

          <Field.Root>
            <Field.Label>Enddate and Time</Field.Label>
            <Input type="datetime-local" name="endTime" required />
          </Field.Root>
        </Stack>
      </CardBody>

      <Card.Footer justifyContent="flex-end" gap={3}>
       

        <Button variant="solid" type="submit" colorScheme="blue" width="full">
          Create Event
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}


