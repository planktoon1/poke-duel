import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { useMatchContext } from "../contexts/MatchContext";
import { MatchCard } from "./MatchCard";

export function MatchList() {
  const { matches } = useMatchContext();

  if (matches === undefined)
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={46}>
      {matches.map((match) => (
        <MatchCard key={match.name} {...match} />
      ))}
    </SimpleGrid>
  );
}
