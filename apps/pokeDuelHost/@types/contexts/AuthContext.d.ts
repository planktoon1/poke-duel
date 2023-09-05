import { PropsWithChildren } from "react";
export interface IAuthContext {
    /** Undefined if not logged in */
    isAdmin?: boolean;
    /** Real version would take email/pass */
    login: (isAdmin: boolean) => Promise<void>;
    isLoggedIn: boolean;
}
export declare function useAuthContext(): IAuthContext;
export declare function AuthContextProvider({ children }: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
