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
export interface IMatchAPI {
    /**
     * Retrieve an array of matches.
     * @returns {Promise<Array<IMatch>>} A promise that resolves to an array of match objects.
     */
    getMatches: () => Promise<Array<IMatch>>;
}
export declare class MatchAPI implements IMatchAPI {
    getMatches(): Promise<Array<IMatch>>;
    private formatError;
}
