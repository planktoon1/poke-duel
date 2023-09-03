import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import Counter from "./Counter";

function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Counter />
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
            Front-Row{" "}
            <Text as={"span"} className="text-green-500 whitespace-nowrap">
              Pokémon Duels
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Immerse yourself in the electrifying world of Pokémon battles like
            never before. Witness fierce clashes between teh most powerful
            Pokémon. Our exclusive Duel Spectator Tickets grant you a front-row
            seat to the most anticipated duels in the Pokémon universe.
          </Text>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
