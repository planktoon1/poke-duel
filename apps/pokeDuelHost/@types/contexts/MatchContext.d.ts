import { PropsWithChildren } from "react";
import { IMatch } from "../apis/matchAPI";
import { ILocation, IPokemon, IPokemonLookup } from "../apis/pokemonAPI.types";
export interface IEnrichedMatch extends Omit<IMatch, "challenger" | "challengee"> {
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
export declare function useMatchContext(): IMatchContext;
export declare function MatchContextProvider({ children }: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
