import { wait } from "../utils/general";

export interface IMatch {
  name: string;
  /** id or name of pokemon */
  challenger: number | string;
  /** id or name of pokemon */
  challengee: number | string;
  /** ISO string */
  startTime: string;
  /** ISO string */
  endTime: string;
  location: string;
  entryFee: string;
}

const MOCK_MATCHES: Array<IMatch> = [
  {
    name: "Battle Extravaganza",
    challenger: 146,
    challengee: 150,
    startTime: "2023-09-01T12:00:00.000Z",
    endTime: "2023-09-01T18:00:00.000Z",
    location: "battle-park",
    entryFee: "50 PokeCoins",
  },
  {
    name: "Factory Frenzy",
    challenger: 143,
    challengee: 25,
    startTime: "2023-09-10T12:00:00Z",
    endTime: "2023-09-10T14:00:00Z",
    location: "battle-factory",
    entryFee: "8 PokeCoins",
  },
  {
    name: "Twilight Showdown",
    challenger: 16,
    challengee: 57,
    startTime: "2023-09-15T17:45:00Z",
    endTime: "2023-09-15T19:30:00Z",
    location: "sinnoh-cafe",
    entryFee: "12 PokeCoins",
  },
  {
    name: "Castle Clash",
    challenger: 38,
    challengee: 234,
    startTime: "2023-09-20T14:15:00Z",
    endTime: "2023-09-20T16:00:00Z",
    location: "battle-castle",
    entryFee: "10 PokeCoins",
  },
  {
    name: "Arcade Mayhem",
    challenger: 3,
    challengee: 8,
    startTime: "2023-10-05T11:00:00Z",
    endTime: "2023-10-05T13:00:00Z",
    location: "battle-arcade",
    entryFee: "7 PokeCoins",
  },
  {
    name: "Distorted Duels",
    challenger: 96,
    challengee: 106,
    startTime: "2023-10-10T15:00:00Z",
    endTime: "2023-10-10T17:00:00Z",
    location: "distortion-world",
    entryFee: "20 PokeCoins",
  },
  {
    name: "Global Showdown",
    challenger: 245,
    challengee: 324,
    startTime: "2023-10-15T11:00:00Z",
    endTime: "2023-10-15T13:00:00Z",
    location: "sinnoh-global-terminal",
    entryFee: "5 PokeCoins",
  },
  {
    name: "Frosty Fights",
    challenger: 78,
    challengee: 95,
    startTime: "2023-11-10T14:00:00Z",
    endTime: "2023-11-10T16:00:00Z",
    location: "iceberg-ruins",
    entryFee: "10 PokeCoins",
  },
  {
    name: "Mountain Mayhem",
    challenger: 231,
    challengee: 234,
    startTime: "2023-11-15T16:30:00Z",
    endTime: "2023-11-15T18:30:00Z",
    location: "rock-peak-ruins",
    entryFee: "12 PokeCoins",
  },
  {
    name: "Goldenrod Grand Prix",
    challenger: 247,
    challengee: 246,
    startTime: "2023-11-20T12:00:00Z",
    endTime: "2023-11-20T14:00:00Z",
    location: "goldenrod-city",
    entryFee: "15 PokeCoins",
  },
  {
    name: "Eterna Rumble",
    challenger: 123,
    challengee: 321,
    startTime: "2023-11-25T18:00:00Z",
    endTime: "2023-11-25T20:00:00Z",
    location: "tg-eterna-bldg",
    entryFee: "8 PokeCoins",
  },
  {
    name: "Roof-Top Showdown",
    challenger: 42,
    challengee: 55,
    startTime: "2023-11-30T20:30:00Z",
    endTime: "2023-11-30T22:30:00Z",
    location: "sinnoh-villa",
    entryFee: "10 PokeCoins",
  },
];

export interface IMatchAPI {
  /**
   * Retrieve an array of matches.
   * @returns {Promise<Array<IMatch>>} A promise that resolves to an array of match objects.
   */
  getMatches: () => Promise<Array<IMatch>>;
}

export class MatchAPI implements IMatchAPI {
  async getMatches(): Promise<Array<IMatch>> {
    await wait(456);
    return MOCK_MATCHES;
  }

  private formatError(error: unknown) {
    return `🧨 MatchAPI error: ${error}`;
  }
}
