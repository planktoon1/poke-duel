# Poké duel - event management

A development exercise. Exploring React, monorepo and microfrontend architecture.

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
