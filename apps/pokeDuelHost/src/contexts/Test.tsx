// @ts-ignore
import { MatchModal as MatchModelRemote } from "pokeDuelManagement/MatchModal";
import { IEnrichedMatch } from "./MatchContext";

export function Test({
  isMatchModalOpen,
  closeMatchModal,
  matchToEdit,
}: {
  matchToEdit: IEnrichedMatch | undefined;
  isMatchModalOpen: boolean;
  closeMatchModal: () => void;
}) {
  return (
    <MatchModelRemote
      isOpen={isMatchModalOpen}
      onClose={closeMatchModal}
      matchToEdit={matchToEdit}
    />
  );
}
