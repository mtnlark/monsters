# Monsterhearts 2 Character Sheet

A simple, focused character sheet for [Monsterhearts 2](https://buriedwithoutceremony.com/monsterhearts), the tabletop RPG about the messy lives of teenage monsters.

**[Use it here](https://monsters.levcraig.com)**

## Features

- Track your Hot/Cold/Dark/Volatile stats
- Roll 2d6 and apply stat modifiers
- Mark harm and experience
- Keep notes on your strings and conditions
- Dark/light mode toggle
- Everything autosaves to your browser

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Architecture

```
src/
├── hooks/
│   └── useCharacter.ts    # State management + localStorage persistence
├── components/common/
│   ├── DiceRoller.tsx     # 2d6 roller with stat application
│   ├── DieVisual.tsx      # Single die display
│   ├── StatTracker.tsx    # Hot/Cold/Dark/Volatile editor
│   ├── HarmExperienceTracker.tsx
│   └── TextTracker.tsx    # Strings/Conditions text areas
├── types/
│   └── stats.ts           # TypeScript interfaces
└── App.tsx                # Main layout (presentation only)
```

**Data flow:** All character state lives in the `useCharacter` hook, which persists to localStorage. Components are controlled (stateless) and receive data via props.

## Tech Stack

- [React](https://react.dev/) 18 with TypeScript
- [Vite](https://vitejs.dev/) for builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for tests

## License

MIT
