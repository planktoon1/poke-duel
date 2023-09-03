import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createRegisteredContext } from "react-singleton-context";
import { IMatch, MatchAPI } from "../apis/matchAPI";
import { PokemonAPI } from "../apis/pokemonAPI";
import { ILocation, IPokemon, IPokemonLookup } from "../apis/pokemonAPI.types";

import { useDisclosure } from "@chakra-ui/react";

export interface IEnrichedMatch
  extends Omit<IMatch, "challenger" | "challengee"> {
  challenger: IPokemon;
  challengee: IPokemon;
}

export interface IMatchContext {
  /** Undefined means matches has not yet been fetched */
  matches?: IEnrichedMatch[];
  fetchPokemons: () => Promise<void>;
  fetchLocations: () => Promise<void>;
  /** Creates a match and adds it to the matches list */
  createMatch: (match: IMatch) => Promise<void>;
  /** Undefined means not yet fetched */
  pokemons?: IPokemonLookup[];
  /** Undefined means not yet fetched */
  locations?: ILocation[];
  openMatchModal: (matchName?: string) => void;
  editMatch: (match: IMatch) => Promise<void>;
  matchToEdit: IEnrichedMatch | undefined;
  isMatchModalOpen: boolean;
  closeMatchModal: () => void;
}

const MatchContext = createRegisteredContext<IMatchContext | undefined>(
  "MatchContext",
  undefined
);

export function useMatchContext() {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error(
      "useMatchContext must be used within an MatchContextProvider"
    );
  }
  return context;
}

const matchAPI: MatchAPI = new MatchAPI();
const pokemonAPI: PokemonAPI = new PokemonAPI();

export function MatchContextProvider({ children }: PropsWithChildren) {
  const [matches, setMatches] = useState<IEnrichedMatch[] | undefined>(
    undefined
  );
  const [matchToEdit, setMatchToEdit] = useState<IEnrichedMatch | undefined>(
    undefined
  );
  const [pokemons, setPokemons] = useState<IPokemonLookup[] | undefined>(
    undefined
  );
  const [locations, setLocations] = useState<ILocation[] | undefined>(
    undefined
  );

  const {
    isOpen: isMatchModalOpen,
    onClose: onMatchModalClose,
    onOpen: onMatchModalOpen,
  } = useDisclosure();

  useEffect(() => {
    getMatchData();
  }, []);

  async function openMatchModal(matchName?: string) {
    /**
     * Quick solution to ensure data is ready when editing matches.
     * Possible better ways:
     *  1. always fetch pokemon and locations on page load so its always ready
     *   * Arguably not great as then we are fetching data that is not needed, example if the user is not admin so they cant access the modal.
     *  2. fix in the modal so that the select fields are selected once the data is ready
     *   * As the problem is now that the default value is set but the matching option is not yet ready to be selected
     */
    if (matchName && pokemons === undefined) {
      await Promise.all([fetchPokemons(), fetchLocations()]);
    }
    setMatchToEdit(matches?.find((match) => match.name === matchName));
    onMatchModalOpen();
  }

  function closeMatchModal() {
    setMatchToEdit(undefined);
    onMatchModalClose();
  }

  async function fetchPokemons() {
    const pokemons = await pokemonAPI.getPokemons();
    setPokemons(pokemons);
  }

  async function fetchLocations() {
    const locations = await pokemonAPI.getLocations();
    setLocations(locations);
  }

  async function getMatchData() {
    const matches = await matchAPI.getMatches();
    const allPokemonIds = matches.flatMap((match) => [
      match.challengee,
      match.challenger,
    ]);
    const uniquePokemonIds = [...new Set(allPokemonIds)]; // Remove duplicates

    try {
      const pokemonPromises = uniquePokemonIds.map((id) =>
        pokemonAPI.getPokemon(`${id}`)
      );
      /**
       * Possible improvements:
       * 1. Potentially a lot of requests which could be optimized by using other batch endpoint, or batching in time intervals to not overwhelm backend.
       * 2. If any of the calls throws an error no pokemon will be set in state. This could be handled in a way where one fail wouldnt effect the rest.
       * 3. Pokemons could be saved in state so that when creating a new match, if the pokemon is already fetched we can avoid fetching again.
       */
      const allPokemons = await Promise.all(pokemonPromises);

      const enrichedMatched = matches.map((match) => ({
        ...match,
        /**
         *  1. Using find is not the most perfomant way to do this. saving all pokemons in a map with id as key would be better
         *  2. We assume all pokemons that are defined in the matches exist and therefore will be available in the array
         */
        challengee: allPokemons.find(
          (pokemon) => pokemon.id === match.challengee
        ) as IPokemon,
        challenger: allPokemons.find(
          (pokemon) => pokemon.id === match.challenger
        ) as IPokemon,
      }));

      setMatches(enrichedMatched);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  async function createMatch(match: IMatch) {
    // get the enriched pokemon data
    const [challengee, challenger] = await Promise.all([
      pokemonAPI.getPokemon(String(match.challengee)),
      pokemonAPI.getPokemon(String(match.challenger)),
    ]);

    const newMatch: IEnrichedMatch = {
      ...match,
      challengee,
      challenger,
    };

    /** We throw it as the first in the array so we can easily see it on the page. Alternatively should maybe be sorted by date */
    setMatches((curr) => (curr ? [newMatch, ...curr] : [newMatch]));
  }

  async function editMatch(edittedMatch: IMatch) {
    if (!matches) return; // cant edit a match if there are no matches. throw an error

    // potential optimizatin: only fetch if changed (and not already fetched for other match)
    const [challengee, challenger] = await Promise.all([
      pokemonAPI.getPokemon(String(edittedMatch.challengee)),
      pokemonAPI.getPokemon(String(edittedMatch.challenger)),
    ]);

    // find and replace match with edited match (note performance wise we're looping over all matches even after the match is found)
    setMatches(
      matches.map((currentMatch) =>
        currentMatch.name === edittedMatch.name
          ? {
              ...edittedMatch,
              challengee,
              challenger,
            }
          : currentMatch
      )
    );
  }

  const contextValue: IMatchContext = {
    matches,
    editMatch,
    fetchPokemons,
    fetchLocations,
    createMatch,
    openMatchModal,
    locations,
    pokemons,
    isMatchModalOpen,
    closeMatchModal,
    matchToEdit,
  };

  return (
    <MatchContext.Provider value={contextValue}>
      {children}
    </MatchContext.Provider>
  );
}
