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
export class PokemonAPI implements IPokemonAPI {
  private baseURL: string;

  constructor(baseURL: string = "https://pokeapi.co/api/v2") {
    this.baseURL = baseURL;
  }

  async getPokemon(nameOrId: string): Promise<IPokemon> {
    try {
      const response = await fetch(`${this.baseURL}/pokemon/${nameOrId}/`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const pokemonData: IPokemon = await response.json();
      return pokemonData;
    } catch (error) {
      return Promise.reject(this.formatError(error));
    }
  }
  async getLocations(): Promise<Array<ILocation>> {
    try {
      const response = await fetch(`${this.baseURL}/location?limit=10000`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const pokemonData: Array<ILocation> = (await response.json()).results;
      return pokemonData;
    } catch (error) {
      return Promise.reject(this.formatError(error));
    }
  }
  async getPokemons(limit: number = 1000): Promise<Array<IPokemonLookup>> {
    try {
      const response = await fetch(`${this.baseURL}/pokemon?limit=${limit}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const pokemonData: Array<IPokemonLookup> = (await response.json())
        .results;
      return pokemonData;
    } catch (error) {
      return Promise.reject(this.formatError(error));
    }
  }

  private formatError(error: unknown) {
    return `🧨 PokemonAPI error: ${error}`;
  }
}
