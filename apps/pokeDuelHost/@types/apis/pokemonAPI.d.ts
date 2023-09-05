import { ILocation, IPokemon, IPokemonLookup } from "./pokemonAPI.types";
export interface IPokemonAPI {
    /**
     * Retrieve detailed information about a specific Pokemon by name or ID.
     *
     * @param {string} nameOrId - The name or ID of the Pokemon to retrieve.
     * @returns {Promise<IPokemon>} A promise that resolves to the detailed information of the requested Pokemon.
     */
    getPokemon: (nameOrId: string) => Promise<IPokemon>;
    /**
     * Retrieve an array of Pokemon lookup data.
     *
     * @param {number} [limit] - The maximum number of Pokemon lookup data to retrieve.
     * @returns {Promise<Array<IPokemonLookup>>} A promise that resolves to an array of Pokemon lookup objects.
     */
    getPokemons: (limit?: number) => Promise<Array<IPokemonLookup>>;
    /**
     * Retrieve an array of Pokemon locations.
     *
     * @returns {Promise<Array<ILocation>>} A promise that resolves to an array of Pokemon location objects.
     */
    getLocations: () => Promise<Array<ILocation>>;
}
/**
 * Implementation of the IPokemonAPI providing access to Pokemon-related data.
 * @implements {IPokemonAPI}
 */
export declare class PokemonAPI implements IPokemonAPI {
    private baseURL;
    constructor(baseURL?: string);
    getPokemon(nameOrId: string): Promise<IPokemon>;
    getLocations(): Promise<Array<ILocation>>;
    getPokemons(limit?: number): Promise<Array<IPokemonLookup>>;
    private formatError;
}
