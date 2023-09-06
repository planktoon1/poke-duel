import RemoteMatchModalModule from "pokeDuelManagement/MatchModal";
import type LocalMatchModaleModule from "poke-duel-management";

/**
 * We cast the code imported with module federation to the type of the local code:
 *
 * To bridge the gap between dynamically loaded remote modules (which lack TypeScript type information at runtime)
 * and the locally developed module (which has TypeScript types available during development). This allows for
 * TypeScript type checking and code completion during development while still being compatible with the runtime
 * code-sharing mechanism provided by module federation.
 */

export const MatchModal =
  RemoteMatchModalModule as typeof LocalMatchModaleModule;
