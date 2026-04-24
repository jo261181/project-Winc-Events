
  {/* <Box
    as="form"
    onSubmit={(e) => {
      e.preventDefault();

      const form = new FormData(e.target);

      const newEvent = {
        title: form.get("title"),
        description: form.get("description"),
        image: form.get("image"),
        location: form.get("location"),
        startTime: form.get("startTime"),
        endTime: form.get("endTime"),
        categoryIds: form.getAll("categoryIds").map(Number),
      };

      addEvent(newEvent);
    }}
  >
    <label>Titel</label>
    <input name="title" required />

    <label>Beschrijving</label>
    <input name="description" required />

    <label>Locatie</label>
    <input name="location" required />

    <label>Afbeelding URL</label>
    <input name="image" required />

    <label>Starttijd</label>
    <input type="datetime-local" name="startTime" required />

    <label>Eindtijd</label>
    <input type="datetime-local" name="endTime" required />

    <label>Categorieën</label>
    <Box display="flex" flexDir="column" gap={1}>
      {categories.map((cat) => (
        <label key={cat.id}>
          <input type="checkbox" name="categoryIds" value={cat.id} />
          {cat.name}
        </label>
      ))}
    </Box>

    <Button type="submit" mt={4}>
      Opslaan
    </Button>
  </Box>
</SimpleModal>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {eventsArray.map((evt) => (
            <li key={evt.id} style={{ marginBottom: "20px" }}>
              <Card.Root
                maxW="400px"
                w="100%"
                p={4}
                borderRadius="xl"
                shadow="md"
                bg="white"
              >
                <Image
                  src={evt.image}
                  alt={evt.title}
                  objectFit="cover"
                  boxSize="200px"
                  borderRadius="md"
                  mb={2}
                />

                <p>
                  <strong>{evt.title}</strong>
                </p>

                <Card.Description>
                  <p>{evt.location}</p>
                  <p>{evt.description}</p>

                  {new Date(evt.startTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  {" – "}
                  {new Date(evt.endTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}

                  <HStack mt={4}>
                    {evt.categoryIds?.map((id) => {
                      const category = categories.find((c) => c.id === id);
                      return (
                        <Badge key={id} colorPalette="orange">
                          {category?.name}
                        </Badge>
                      );
                    })}
                  </HStack>
                </Card.Description>

                <Card.Footer mt={4}>
                  <Button>Buy Latte</Button>
                </Card.Footer>
              </Card.Root>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
}