# Poké duel - event management

A development exercise.

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

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:8001](http://localhost:8001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
