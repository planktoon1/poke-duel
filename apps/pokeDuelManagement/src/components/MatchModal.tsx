import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IPokemon } from "../pokemonAPI.types";

// @ts-ignore
import { useMatchContext } from "pokeDuelHost/MatchContext";

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

export interface IEnrichedMatch
  extends Omit<IMatch, "challenger" | "challengee"> {
  challenger: IPokemon;
  challengee: IPokemon;
}

interface IMatchFormFields {
  title: { value: string };
  challenger: { value: string };
  challengee: { value: string };
  start: { value: string };
  end: { value: string };
  location: { value: string };
  price: { value: string };
}

export interface IMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** If provided the modal will edit the match. If omitted a new match will be created */
  matchToEdit?: IEnrichedMatch;
}

export function MatchModal() {
  const {
    fetchPokemons,
    fetchLocations,
    createMatch,
    locations,
    pokemons,
    editMatch,
    matchToEdit,
    isMatchModalOpen,
    closeMatchModal,
  } = useMatchContext();
  const [isLoading, setIsLoading] = useBoolean();
  const [isSubmitLoading, setIsSubmitLoading] = useBoolean();

  useEffect(() => {
    async function getPokemons() {
      setIsLoading.on();
      await fetchPokemons();
      await fetchLocations();
      setIsLoading.off();
    }
    if (pokemons === undefined && !isLoading && isMatchModalOpen) getPokemons();
  }, [
    pokemons,
    isLoading,
    setIsLoading,
    fetchPokemons,
    fetchLocations,
    isMatchModalOpen,
  ]);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & IMatchFormFields;
    setIsSubmitLoading.on();
    const match: IMatch = {
      name: target.title.value,
      challenger: target.challenger.value,
      challengee: target.challengee.value,
      startTime: target.start.value,
      endTime: target.end.value,
      location: target.location.value,
      entryFee: `${target.price.value} PokeCoins`, // Would be better to have entryFee be number and maybe another field for currency type
    };
    if (matchToEdit) await editMatch(match);
    else await createMatch(match);

    setIsSubmitLoading.off();
    closeMatchModal();
  }

  return (
    <Modal isOpen={isMatchModalOpen} onClose={closeMatchModal}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {matchToEdit ? "📝 Edit duel" : "⚔ Plan new duel"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="title" isRequired isDisabled={!!matchToEdit}>
                <FormLabel>Name of duel</FormLabel>
                <Input
                  type="text"
                  name="title"
                  defaultValue={matchToEdit?.name}
                />
              </FormControl>
              <HStack>
                <Box w="full">
                  <FormControl id="challenger" isRequired>
                    <FormLabel>Challenger</FormLabel>
                    <Select
                      placeholder="Select challenger"
                      name="challenger"
                      defaultValue={matchToEdit?.challenger.name}
                      disabled={isLoading}
                      icon={isLoading ? <Spinner /> : <ChevronDownIcon />}
                    >
                      {// @ts-ignore
                      pokemons?.map((pokemon) => (
                        <option key={pokemon.url} value={pokemon.name}>
                          {pokemon.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box w="full">
                  <FormControl id="challengee" isRequired>
                    <FormLabel>Challengee</FormLabel>
                    <Select
                      placeholder="Select challengee"
                      disabled={isLoading}
                      name="challengee"
                      defaultValue={matchToEdit?.challengee.name}
                      icon={isLoading ? <Spinner /> : <ChevronDownIcon />}
                    >
                      {// @ts-ignore
                      pokemons?.map((pokemon) => (
                        <option key={pokemon.url} value={pokemon.name}>
                          {pokemon.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box w="full">
                  <FormControl id="challenger" isRequired>
                    <FormLabel>Start</FormLabel>
                    {/* Couldn't find a date picker in chakra so using native html. means isRequired doesnt work out of the box */}
                    <input
                      type="date"
                      id="start"
                      name="start"
                      defaultValue={
                        (matchToEdit
                          ? matchToEdit.startTime
                          : new Date().toISOString()
                        ).split("T")[0]
                      }
                      className="w-full border p-1.5 rounded"
                    />
                  </FormControl>
                </Box>
                <Box w="full">
                  <FormControl id="challengee" isRequired>
                    <FormLabel>End</FormLabel>
                    {/* Couldn't find a date picker in chakra so using native html. means isRequired doesnt work out of the box */}
                    <input
                      type="date"
                      id="end"
                      name="end"
                      defaultValue={
                        (matchToEdit
                          ? matchToEdit.endTime
                          : new Date().toISOString()
                        ).split("T")[0]
                      }
                      className="w-full border p-1.5 rounded"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Select
                  placeholder="Select location"
                  disabled={isLoading}
                  name="location"
                  defaultValue={matchToEdit?.location}
                  icon={isLoading ? <Spinner /> : <ChevronDownIcon />}
                >
                  {// @ts-ignore
                  locations?.map((location) => (
                    <option key={location.url} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Price</FormLabel>
                <NumberInput
                  defaultValue={matchToEdit?.entryFee}
                  max={1000}
                  min={0}
                  name="price"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={closeMatchModal}
              isLoading={isSubmitLoading}
            >
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitLoading}
            >
              {matchToEdit ? "Edit duel" : "Plan duel"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default MatchModal;
