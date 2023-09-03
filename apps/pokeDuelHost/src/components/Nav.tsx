import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Stack,
  Text,
  useBoolean,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuthContext } from "../contexts/AuthContext";
import { useMatchContext } from "../contexts/MatchContext";

export default function Navbar() {
  const { login, isLoggedIn, isAdmin } = useAuthContext();
  const { isOpen, onToggle } = useDisclosure();
  const [authLoading, setAuthLoading] = useBoolean(false);

  async function authenticate(isAdmin: boolean) {
    setAuthLoading.on();
    await login(isAdmin);
    setAuthLoading.off();
  }

  return (
    <Box>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          {isAdmin && (
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          )}
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={"gray.800"}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1408/1408785.png"
              className="w-6 h-6 inline-block mr-2 mb-1"
              alt="logo"
            />
            Poké Duels
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!isLoggedIn && (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"#"}
                isLoading={authLoading}
                onClick={() => authenticate(false)}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"rgb(34 197 94);"}
                href={"#"}
                _hover={{
                  bg: "green.700",
                }}
                isLoading={authLoading}
                onClick={() => authenticate(true)}
              >
                Sign In as admin
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Text
              textAlign={"right"}
              className="whitespace-nowrap"
              fontFamily={"heading"}
              color={"gray.800"}
            >
              Hello {isAdmin ? "Ash Ketchum" : "Brock"}
            </Text>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { isAdmin } = useAuthContext();
  const { openMatchModal } = useMatchContext();

  return (
    <Stack direction={"row"} spacing={4}>
      {isAdmin && (
        <Box
          as="button"
          fontSize={"sm"}
          onClick={() => openMatchModal()}
          fontWeight={500}
          color={"gray.600"}
          _hover={{
            textDecoration: "none",
            color: "gray.800",
          }}
        >
          Plan duel
        </Box>
      )}
    </Stack>
  );
};

const MobileNav = () => {
  const { isAdmin } = useAuthContext();
  const { openMatchModal } = useMatchContext();
  return (
    <Stack bg={"white"} p={4} display={{ md: "none" }}>
      {isAdmin && (
        <Box
          as="button"
          fontSize={"sm"}
          onClick={() => openMatchModal()}
          fontWeight={500}
          color={"gray.600"}
          _hover={{
            textDecoration: "none",
            color: "gray.800",
          }}
        >
          Plan duel
        </Box>
      )}
    </Stack>
  );
};
