import { IEnrichedMatch } from "../contexts/MatchContext";
export interface IEventCardProps extends IEnrichedMatch {
}
export declare function MatchCard({ name, challengee, challenger, endTime, entryFee, startTime, location, }: IEventCardProps): import("react/jsx-runtime").JSX.Element;
export declare function AvatarImage({ imageUrl, size, horizontallyFlipped, }: {
    imageUrl: string;
    size?: number;
    horizontallyFlipped?: boolean;
}): import("react/jsx-runtime").JSX.Element;
