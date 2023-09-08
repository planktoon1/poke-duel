# Poké duel - event management

A development exercise. Exploring React, monorepo and microfrontend architecture.
It is most of all a poc implementation of the above things and there are suboptimal, mocked and lacking implementations. 

Apps:
 - PokeDuel: Standalone app
 - PokeDuelManagement: MatchModal component extracted from the standalone app and configured as a microfrontend with module federation.
 - PokeDuelHost: The host application, hosting PokeDuelManagement application and the rest of the application. Also acts as remote serving the MatchContext to PokeDuelManagement. 

Limitation:
 - The setup is exploring typescript type sharing which works in the setup, but it breaks the monorepo dependency graph. For this to be a production-ready solution further refinement on the type sharing is needed. With the current setup monorepo commands either complain or just dont work at all. 

Focus:

- Deliver PoC which adequately demonstrates potential of application
- Develop within a limited timeframe (tools and architecture decisions based on this)
- Demonstrate technical knowhow

Features:

- List all upcoming duels
- Login as admin or normal user
- Edit duel (admin only)
- Create duel (admin only)

Tools:

- Typescript
- Poké API https://pokeapi.co/
- Chakra UI https://chakra-ui.com/
- Tailwind https://tailwindcss.com/
- Create React App https://create-react-app.dev/

Mocked functionality:

- Match API
  - getMatches endpoint in the mocked API
  - update and create mocked in logic layer
- Authentication
  - No API layer, mocked in logic layer

Not included:

- Selecting time of day when creating or editing duels (always uses 02:00)
- Persisting state, login as well as duel state
- Logout feature (refresh works)
- Comprehensive form validation
- Accessibility (for purposes of PoC not in focus)
- Testing
- Comprehensive documentation (though parts are well documented)
