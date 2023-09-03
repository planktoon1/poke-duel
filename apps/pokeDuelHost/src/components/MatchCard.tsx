import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IEnrichedMatch, useMatchContext } from "../contexts/MatchContext";
import { capitalizeFirstLetter, isoToDisplayable } from "../utils/general";
import { useAuthContext } from "../contexts/AuthContext";

export interface IEventCardProps extends IEnrichedMatch {}

export function MatchCard({
  name,
  challengee,
  challenger,
  endTime,
  entryFee,
  startTime,
  location,
}: IEventCardProps) {
  const { isAdmin } = useAuthContext();
  const { openMatchModal } = useMatchContext();

  return (
    <Center>
      <Box position="relative" role="group" maxW={"330px"}>
        <Box
          position="absolute"
          bottom={0}
          right={0}
          left={0}
          top={0}
          boxShadow="0 4px 20px rgba(0, 255, 0, 0.5)"
          rounded={"lg"}
          display="flex"
          justifyContent="flex-end"
          alignItems={"end"}
          pointerEvents={"none"}
          opacity={0}
          transition="all .2s ease"
          _groupHover={{
            opacity: 1,
          }}
        >
          {isAdmin && (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"rgb(34 197 94);"}
              margin={2}
              zIndex={2}
              pointerEvents={"auto"}
              boxShadow="0 4px 20px rgba(0, 255, 0, 0.5)"
              onClick={() => openMatchModal(name)}
            >
              Edit
            </Button>
          )}
        </Box>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          minW={270}
          w={"full"}
          h={"full"}
          bg={"white"}
          boxShadow={"xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Flex className="justify-between -mx-6 -mt-8">
            <AvatarImage
              imageUrl={challenger.sprites.other.dream_world.front_default}
              horizontallyFlipped
            />
            <Heading
              className="italic text-slate-800 mt-4"
              fontSize={"7xl"}
              _groupHover={{
                transform: "scale(1.05)",
              }}
              transition={"all .3s ease"}
            >
              VS
            </Heading>
            <AvatarImage
              imageUrl={challengee.sprites.other.dream_world.front_default}
            />
          </Flex>
          <Stack pt={10} align={"center"}>
            <Text
              title="When"
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {isoToDisplayable(startTime)} - {isoToDisplayable(endTime)}
            </Text>
            <Heading
              title="Event name"
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={800}
            >
              {name}
            </Heading>
            <Text title="Location" fontWeight={500} fontSize={"xl"}>
              {capitalizeFirstLetter(location).replaceAll("-", " ")}
            </Text>
            <Text
              title="Price"
              fontSize={"sm"}
              fontWeight={800}
              className="text-green-500 opacity-75"
              marginTop={-3}
              marginBottom={-2}
            >
              {entryFee}
            </Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}

export function AvatarImage({
  imageUrl,
  size = 110,
  horizontallyFlipped = false,
}: {
  imageUrl: string;
  size?: number;
  horizontallyFlipped?: boolean;
}) {
  return (
    <Box
      rounded={"lg"}
      pos={"relative"}
      height={size}
      width={size}
      transform={horizontallyFlipped ? "scaleX(-1);" : ""}
      _after={{
        transition: "all .5s ease",
        content: '""',
        w: "full",
        h: "full",
        pos: "absolute",
        top: 1,
        right: 0,
        opacity: 0.5,
        backgroundImage: `url(${imageUrl})`,
        filter: "blur(15px)",
        zIndex: -1,
      }}
      _groupHover={{
        _after: {
          opacity: 0.8,
        },
      }}
    >
      <Image
        rounded={"lg"}
        height={size}
        width={size}
        objectFit={"fill"}
        src={imageUrl}
        alt="#"
      />
    </Box>
  );
}
