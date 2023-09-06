import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import MatchModal from "./components/MatchModal";
import { useMatchContext } from "./remoteModule";

function App() {
  const { openMatchModal } = useMatchContext();

  function newDuel() {
    openMatchModal();
  }
  function editDuel() {
    openMatchModal("Arcade Mayhem");
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Pokémon Duels{" "}
            <Text as={"span"} className="text-green-500 whitespace-nowrap">
              Management
            </Text>{" "}
            App
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            This is the pokeduel management microfrontend.
          </Text>
          <Text color={"gray.500"} maxW={"3xl"}>
            It contains the MatchModal code.
          </Text>
          <Button onClick={newDuel}>Open modal (New duel)</Button>
          <Button onClick={editDuel}>Open modal (Edit duel)</Button>
        </Stack>
        <MatchModal />
      </Container>
    </div>
  );
}

export default App;
