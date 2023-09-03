import { PropsWithChildren, createContext, useContext, useState } from "react";
import { wait } from "../utils/general";
import { useBoolean } from "@chakra-ui/react";

export interface IAuthContext {
  /** Undefined if not logged in */
  isAdmin?: boolean;
  /** Real version would take email/pass */
  login: (isAdmin: boolean) => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useBoolean(false);

  async function login(isAdmin: boolean) {
    // wait for some auth request to return
    await wait(1200); // slow auth server
    setIsAdmin(isAdmin);
    setIsLoggedIn.on();
  }

  const contextValue: IAuthContext = {
    login,
    isAdmin,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
