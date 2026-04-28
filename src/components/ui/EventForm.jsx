import {
  Button,
  CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Field,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export default function EventForm({ cancel }) {
  return (
    <CardRoot maxW="sm">
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
        <CardDescription>
          Fill in the form below to create an event
        </CardDescription>
      </CardHeader>

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

      <CardFooter justifyContent="flex-end" gap={3}>
       

        <Button variant="solid" type="submit" colorScheme="blue" width="full">
          Create Event
        </Button>
      </CardFooter>
    </CardRoot>
  );
}


