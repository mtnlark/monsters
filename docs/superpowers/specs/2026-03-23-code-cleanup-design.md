# Code Quality Improvements Design

**Date**: 2026-03-23
**Status**: Approved

## Overview

Systematic improvements to the Monsterhearts 2 character sheet app focusing on code quality, testability, and engineering best practices.

## Goals

- Improve code architecture with clear separation of concerns
- Add comprehensive test coverage
- Fix all technical debt and configuration issues
- Improve documentation for maintainability

## Non-Goals

- Adding new features or UI changes
- Backend/API integration
- Component library or Storybook setup

---

## Architecture Changes

### 1. Extract `useCharacter` Hook

Create `src/hooks/useCharacter.ts` to encapsulate all character state and persistence logic.

**Interface:**
```typescript
interface CharacterData {
  name: string;
  stats: Stats;
  harm: number;
  experience: number;
  strings: string;
  conditions: string;
}

interface UseCharacterReturn {
  character: CharacterData;
  updateName: (name: string) => void;
  updateStats: (stats: Stats) => void;
  updateHarm: (harm: number) => void;
  updateExperience: (experience: number) => void;
  updateStrings: (strings: string) => void;
  updateConditions: (conditions: string) => void;
  resetCharacter: () => void;
}
```

**Responsibilities:**
- Load initial state from localStorage
- Provide update functions for each field
- Auto-save to localStorage on any change
- Handle reset with confirmation

### 2. Convert Components to Controlled

Remove internal state from child components. They should receive current values as props and call callbacks on user interaction.

**Affected components:**
- `StatTracker` - remove internal `useState`/`useEffect` sync
- `HarmExperienceTracker` - remove internal state
- `TextTracker` - remove internal state

### 3. Extract `DieVisual` Component

Move `DieVisual` from `DiceRoller.tsx` to its own file at `src/components/common/DieVisual.tsx` for better organization.

---

## Testing Strategy

### Setup

- **Vitest** - test runner (Vite-native, fast)
- **React Testing Library** - component testing
- **jsdom** - DOM environment
- **@testing-library/jest-dom** - custom matchers

### Test Files

| File | Coverage |
|------|----------|
| `src/hooks/useCharacter.test.ts` | Hook logic, localStorage integration |
| `src/components/common/DiceRoller.test.tsx` | Rolling, stat application |
| `src/components/common/StatTracker.test.tsx` | Increment/decrement, bounds |
| `src/components/common/HarmExperienceTracker.test.tsx` | Toggle behavior |
| `src/App.test.tsx` | Smoke test, dark mode toggle |

### Test Categories

**Unit tests (hook):**
- Returns correct initial state
- Each update function works correctly
- Persists to localStorage
- Reset clears all data

**Integration tests (components):**
- User interactions trigger correct callbacks
- Bounds are respected (stats -3 to +3, harm 0-4, experience 0-5)
- Display updates reflect prop changes

**Smoke tests (app):**
- Renders without crashing
- Core user flows work end-to-end

---

## Technical Debt Fixes

### Configuration

| Issue | Resolution |
|-------|------------|
| `.eslintrc.js` uses CommonJS in ESM project | Rename to `.eslintrc.cjs` |
| Duplicate Tailwind configs | Delete `tailwind.config.cjs` |
| Outdated browserslist | Run `npx update-browserslist-db@latest` |
| Missing `eslint-plugin-react` | Add to devDependencies |
| `tsconfig.json` targets ES5 | Update to ES2020 |

### Code Quality

| Issue | Resolution |
|-------|------------|
| `console.log` in App.tsx:79 | Remove |
| Hardcoded `class="dark"` in index.html | Remove (React controls this) |
| Inconsistent semicolons | Standardize to include semicolons |
| `TEXT_AREA_HEIGHT` magic number | Add clarifying comment |

### Accessibility

| Component | Fix |
|-----------|-----|
| StatTracker buttons | Add `aria-label="Increase {stat}"` / `"Decrease {stat}"` |
| Harm/Experience buttons | Add `aria-label` and `aria-pressed` |

### Assets

| Issue | Resolution |
|-------|------------|
| Default Vite favicon | Replace with app-appropriate icon |

---

## Documentation

### JSDoc Comments

Add to:
- `useCharacter` hook - full documentation with `@returns`
- `CharacterData` and `Stats` types - field descriptions
- Component props interfaces - expected behavior

### README Updates

Expand to include:
- Prominent live demo link (https://monsters.levcraig.com/)
- Architecture overview explaining data flow
- Development commands (dev, test, build)
- Tech stack summary

---

## File Changes Summary

### New Files
- `src/hooks/useCharacter.ts`
- `src/hooks/useCharacter.test.ts`
- `src/components/common/DieVisual.tsx`
- `src/components/common/DiceRoller.test.tsx`
- `src/components/common/StatTracker.test.tsx`
- `src/components/common/HarmExperienceTracker.test.tsx`
- `src/App.test.tsx`
- `src/test/setup.ts` (test utilities)
- `vitest.config.ts`

### Modified Files
- `src/App.tsx` - use hook, simplify to presentation
- `src/components/common/DiceRoller.tsx` - extract DieVisual
- `src/components/common/StatTracker.tsx` - controlled component
- `src/components/common/HarmExperienceTracker.tsx` - controlled component
- `src/components/common/TextTracker.tsx` - controlled component
- `src/types/stats.ts` - add JSDoc
- `package.json` - add test deps and scripts
- `tsconfig.json` - update target
- `index.html` - remove hardcoded class
- `README.md` - expand documentation

### Deleted Files
- `tailwind.config.cjs`

### Renamed Files
- `.eslintrc.js` → `.eslintrc.cjs`

---

## Implementation Order

1. Fix configuration issues (ESLint, Tailwind, tsconfig)
2. Set up Vitest and testing infrastructure
3. Create `useCharacter` hook with tests
4. Convert components to controlled (with tests)
5. Extract `DieVisual` component
6. Add accessibility improvements
7. Update documentation (JSDoc + README)
8. Final cleanup (console.log, semicolons, favicon)
