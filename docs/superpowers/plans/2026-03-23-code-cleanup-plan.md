# Code Quality Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the Monsterhearts 2 character sheet codebase with better architecture, comprehensive tests, and polished engineering practices.

**Architecture:** Extract character state management into a `useCharacter` hook, convert child components to controlled (stateless), add Vitest testing infrastructure with coverage on hook and components.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, React Testing Library, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-23-code-cleanup-design.md`

---

## File Structure

### New Files
| Path | Responsibility |
|------|----------------|
| `src/hooks/useCharacter.ts` | Character state management and localStorage persistence |
| `src/hooks/useCharacter.test.ts` | Unit tests for useCharacter hook |
| `src/components/common/DieVisual.tsx` | Extracted die display component |
| `src/components/common/DiceRoller.test.tsx` | Tests for dice roller |
| `src/components/common/StatTracker.test.tsx` | Tests for stat tracker |
| `src/components/common/HarmExperienceTracker.test.tsx` | Tests for harm/experience |
| `src/App.test.tsx` | Smoke tests for app |
| `src/test/setup.ts` | Test utilities and RTL setup |
| `vitest.config.ts` | Vitest configuration |
| `public/favicon.svg` | App favicon |

### Modified Files
| Path | Changes |
|------|---------|
| `src/App.tsx` | Use useCharacter hook, simplify to presentation |
| `src/components/common/DiceRoller.tsx` | Import DieVisual, remove internal definition |
| `src/components/common/StatTracker.tsx` | Convert to controlled component |
| `src/components/common/HarmExperienceTracker.tsx` | Convert to controlled, add aria attributes |
| `src/components/common/TextTracker.tsx` | Convert to controlled component |
| `src/types/stats.ts` | Add JSDoc comments |
| `package.json` | Add test dependencies and scripts |
| `tsconfig.json` | Update target to ES2020 |
| `index.html` | Remove hardcoded `class="dark"` |
| `README.md` | Expand with architecture and dev commands |

### Deleted Files
| Path | Reason |
|------|--------|
| `tailwind.config.cjs` | Duplicate of tailwind.config.js |

### Renamed Files
| From | To |
|------|-----|
| `.eslintrc.js` | `.eslintrc.cjs` |

---

## Task 1: Fix Configuration Issues

**Files:**
- Rename: `.eslintrc.js` → `.eslintrc.cjs`
- Delete: `tailwind.config.cjs`
- Modify: `tsconfig.json`
- Modify: `index.html`
- Modify: `package.json`

- [ ] **Step 1: Install missing eslint-plugin-react**

```bash
npm install -D eslint-plugin-react
```

- [ ] **Step 2: Rename ESLint config to CommonJS extension**

```bash
mv .eslintrc.js .eslintrc.cjs
```

- [ ] **Step 3: Verify ESLint now runs**

Run: `npm run lint 2>&1 | head -20`
Expected: Should run without "module is not defined" error (may have other warnings, that's OK)

- [ ] **Step 4: Delete duplicate Tailwind config**

```bash
rm tailwind.config.cjs
```

- [ ] **Step 5: Update tsconfig.json target**

In `tsconfig.json`, change:
```json
"target": "es5",
```
to:
```json
"target": "ES2020",
```

- [ ] **Step 6: Remove hardcoded dark class from index.html**

In `index.html`, change:
```html
<html lang="en" class="dark">
```
to:
```html
<html lang="en">
```

- [ ] **Step 7: Verify build still works**

Run: `npm run build`
Expected: Build completes successfully

- [ ] **Step 8: Commit configuration fixes**

```bash
git add -A && git commit -m "Fix configuration issues

- Install eslint-plugin-react dependency
- Rename .eslintrc.js to .eslintrc.cjs for CommonJS compatibility
- Remove duplicate tailwind.config.cjs
- Update TypeScript target to ES2020
- Remove hardcoded dark class from index.html (React controls this)"
```

---

## Task 2: Set Up Testing Infrastructure

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Modify: `package.json`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create Vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

- [ ] **Step 3: Create test setup file**

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 4: Add test scripts to package.json**

In `package.json`, add to "scripts":
```json
"test": "vitest",
"test:run": "vitest run",
"test:coverage": "vitest --coverage"
```

- [ ] **Step 5: Create a smoke test to verify setup**

Create `src/App.test.tsx`:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('Monsterhearts 2 Player Sheet')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify setup works**

Run: `npm run test:run`
Expected: 1 test passes

- [ ] **Step 7: Commit testing infrastructure**

```bash
git add -A && git commit -m "Add Vitest testing infrastructure

- Configure Vitest with jsdom environment
- Add React Testing Library and jest-dom
- Add test scripts to package.json
- Add smoke test to verify setup"
```

---

## Task 3: Create useCharacter Hook

**Files:**
- Create: `src/hooks/useCharacter.ts`
- Create: `src/hooks/useCharacter.test.ts`
- Modify: `src/types/stats.ts`

- [ ] **Step 1: Add JSDoc to Stats type**

Modify `src/types/stats.ts`:
```typescript
/**
 * Character stats for Monsterhearts 2.
 * Each stat ranges from -3 to +3.
 */
export interface Stats {
  /** Attractiveness, charm, and social manipulation */
  hot: number;
  /** Composure, calculation, and emotional distance */
  cold: number;
  /** Mystery, danger, and supernatural power */
  dark: number;
  /** Aggression, impulsiveness, and physical threat */
  volatile: number;
}
```

- [ ] **Step 2: Write failing test for useCharacter initial state**

Create `src/hooks/useCharacter.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCharacter } from './useCharacter';

describe('useCharacter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default character when no saved data exists', () => {
    const { result } = renderHook(() => useCharacter());

    expect(result.current.character).toEqual({
      name: '',
      stats: { hot: 0, cold: 0, dark: 0, volatile: 0 },
      harm: 0,
      experience: 0,
      strings: '',
      conditions: '',
    });
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run test:run src/hooks/useCharacter.test.ts`
Expected: FAIL - module not found

- [ ] **Step 4: Create useCharacter hook with initial state**

Create `src/hooks/useCharacter.ts`:
```typescript
import { useState, useEffect, useCallback } from 'react';
import { Stats } from '../types/stats';

/**
 * Character data structure for Monsterhearts 2.
 */
export interface CharacterData {
  name: string;
  stats: Stats;
  harm: number;
  experience: number;
  strings: string;
  conditions: string;
}

const STORAGE_KEY = 'monsterhearts-character';

const DEFAULT_CHARACTER: CharacterData = {
  name: '',
  stats: { hot: 0, cold: 0, dark: 0, volatile: 0 },
  harm: 0,
  experience: 0,
  strings: '',
  conditions: '',
};

/**
 * Hook for managing character state with localStorage persistence.
 *
 * @returns Character data and update functions
 */
export function useCharacter() {
  const [character, setCharacter] = useState<CharacterData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CHARACTER;
      }
    }
    return DEFAULT_CHARACTER;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
  }, [character]);

  const updateName = useCallback((name: string) => {
    setCharacter((prev) => ({ ...prev, name }));
  }, []);

  const updateStats = useCallback((stats: Stats) => {
    setCharacter((prev) => ({ ...prev, stats }));
  }, []);

  const updateHarm = useCallback((harm: number) => {
    setCharacter((prev) => ({ ...prev, harm }));
  }, []);

  const updateExperience = useCallback((experience: number) => {
    setCharacter((prev) => ({ ...prev, experience }));
  }, []);

  const updateStrings = useCallback((strings: string) => {
    setCharacter((prev) => ({ ...prev, strings }));
  }, []);

  const updateConditions = useCallback((conditions: string) => {
    setCharacter((prev) => ({ ...prev, conditions }));
  }, []);

  const resetCharacter = useCallback(() => {
    setCharacter(DEFAULT_CHARACTER);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    character,
    updateName,
    updateStats,
    updateHarm,
    updateExperience,
    updateStrings,
    updateConditions,
    resetCharacter,
  };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test:run src/hooks/useCharacter.test.ts`
Expected: PASS

- [ ] **Step 6: Add test for localStorage loading**

Add to `src/hooks/useCharacter.test.ts`:
```typescript
  it('loads saved character from localStorage', () => {
    const savedCharacter: CharacterData = {
      name: 'Test Character',
      stats: { hot: 1, cold: -1, dark: 2, volatile: 0 },
      harm: 2,
      experience: 3,
      strings: 'Some strings',
      conditions: 'Some conditions',
    };
    localStorage.setItem('monsterhearts-character', JSON.stringify(savedCharacter));

    const { result } = renderHook(() => useCharacter());

    expect(result.current.character).toEqual(savedCharacter);
  });
```

Add import at top:
```typescript
import { useCharacter, CharacterData } from './useCharacter';
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm run test:run src/hooks/useCharacter.test.ts`
Expected: 2 tests pass

- [ ] **Step 8: Add test for update functions**

Add to `src/hooks/useCharacter.test.ts`:
```typescript
  it('updates character name and persists to localStorage', () => {
    const { result } = renderHook(() => useCharacter());

    act(() => {
      result.current.updateName('New Name');
    });

    expect(result.current.character.name).toBe('New Name');

    const saved = JSON.parse(localStorage.getItem('monsterhearts-character') || '{}');
    expect(saved.name).toBe('New Name');
  });

  it('updates stats', () => {
    const { result } = renderHook(() => useCharacter());
    const newStats = { hot: 2, cold: -1, dark: 1, volatile: -2 };

    act(() => {
      result.current.updateStats(newStats);
    });

    expect(result.current.character.stats).toEqual(newStats);
  });

  it('resets character to defaults', () => {
    localStorage.setItem('monsterhearts-character', JSON.stringify({
      name: 'Test',
      stats: { hot: 1, cold: 1, dark: 1, volatile: 1 },
      harm: 2,
      experience: 3,
      strings: 'test',
      conditions: 'test',
    }));

    const { result } = renderHook(() => useCharacter());

    act(() => {
      result.current.resetCharacter();
    });

    expect(result.current.character.name).toBe('');
    expect(result.current.character.harm).toBe(0);
    expect(localStorage.getItem('monsterhearts-character')).toBeNull();
  });
```

- [ ] **Step 9: Run all hook tests**

Run: `npm run test:run src/hooks/useCharacter.test.ts`
Expected: 5 tests pass

- [ ] **Step 10: Commit useCharacter hook**

```bash
git add -A && git commit -m "Add useCharacter hook with tests

- Extract character state management from App.tsx
- Add localStorage persistence
- Include comprehensive test coverage
- Add JSDoc documentation to Stats type"
```

---

## Task 4: Convert StatTracker to Controlled Component

**Files:**
- Modify: `src/components/common/StatTracker.tsx`
- Create: `src/components/common/StatTracker.test.tsx`

- [ ] **Step 1: Write failing test for controlled StatTracker**

Create `src/components/common/StatTracker.test.tsx`:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatTracker } from './StatTracker';

describe('StatTracker', () => {
  const defaultStats = { hot: 0, cold: 0, dark: 0, volatile: 0 };

  it('displays current stat values', () => {
    const stats = { hot: 2, cold: -1, dark: 0, volatile: 1 };
    render(<StatTracker stats={stats} onStatChange={() => {}} />);

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('-1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('calls onStatChange when increment button is clicked', async () => {
    const user = userEvent.setup();
    const onStatChange = vi.fn();
    render(<StatTracker stats={defaultStats} onStatChange={onStatChange} />);

    const incrementButtons = screen.getAllByLabelText(/increase/i);
    await user.click(incrementButtons[0]); // Click first increment (hot)

    expect(onStatChange).toHaveBeenCalledWith({ ...defaultStats, hot: 1 });
  });

  it('respects max stat value of 3', async () => {
    const user = userEvent.setup();
    const onStatChange = vi.fn();
    const stats = { hot: 3, cold: 0, dark: 0, volatile: 0 };
    render(<StatTracker stats={stats} onStatChange={onStatChange} />);

    const incrementButtons = screen.getAllByLabelText(/increase/i);
    await user.click(incrementButtons[0]);

    expect(onStatChange).toHaveBeenCalledWith(stats); // No change
  });

  it('respects min stat value of -3', async () => {
    const user = userEvent.setup();
    const onStatChange = vi.fn();
    const stats = { hot: -3, cold: 0, dark: 0, volatile: 0 };
    render(<StatTracker stats={stats} onStatChange={onStatChange} />);

    const decrementButtons = screen.getAllByLabelText(/decrease/i);
    await user.click(decrementButtons[0]);

    expect(onStatChange).toHaveBeenCalledWith(stats); // No change
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run src/components/common/StatTracker.test.tsx`
Expected: FAIL - props don't match (expects `stats` but component has `initialStats`)

- [ ] **Step 3: Convert StatTracker to controlled component**

Replace `src/components/common/StatTracker.tsx`:
```typescript
import { Stats } from '../../types/stats';

interface StatTrackerProps {
  stats: Stats;
  onStatChange: (stats: Stats) => void;
}

const STAT_MIN = -3;
const STAT_MAX = 3;

/**
 * Displays and allows editing of character stats.
 * Fully controlled component - parent manages state.
 */
export function StatTracker({ stats, onStatChange }: StatTrackerProps) {
  const updateStat = (stat: keyof Stats, delta: number) => {
    const currentValue = stats[stat];
    const newValue = Math.min(Math.max(currentValue + delta, STAT_MIN), STAT_MAX);
    onStatChange({ ...stats, [stat]: newValue });
  };

  const handleInputChange = (stat: keyof Stats, value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(Math.max(numValue, STAT_MIN), STAT_MAX);
    onStatChange({ ...stats, [stat]: clampedValue });
  };

  const getStatColor = (value: number): string => {
    if (value < 0) return 'text-red-400';
    if (value > 0) return 'text-green-400';
    return 'text-gray-900 dark:text-white';
  };

  const handleReset = () => {
    onStatChange({ hot: 0, cold: 0, dark: 0, volatile: 0 });
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
        {(Object.entries(stats) as [keyof Stats, number][]).map(([stat, value]) => (
          <div key={stat} className="flex flex-col items-center p-2 bg-gray-200 dark:bg-gray-700/30 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700/50 transition-colors stat-box">
            <label
              className="text-sm font-medium font-fontin text-gray-700 dark:text-gray-300 capitalize mb-1"
            >
              {stat}
            </label>
            <div className="relative w-[4.5rem]">
              <input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(stat, e.target.value)}
                className={`w-full px-1 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blood-red bg-white dark:bg-gray-800 ${getStatColor(value)} text-xl text-center font-bold transition-colors`}
                min={STAT_MIN}
                max={STAT_MAX}
                aria-label={`${stat} stat value`}
              />
              <div className="absolute inset-y-0 right-0 flex flex-col h-full">
                <button
                  onClick={() => updateStat(stat, 1)}
                  className="h-1/2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 border-l border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white w-5 rounded-tr-md flex items-center justify-center text-xs"
                  aria-label={`Increase ${stat}`}
                >
                  ▲
                </button>
                <button
                  onClick={() => updateStat(stat, -1)}
                  className="h-1/2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 border-l border-t border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white w-5 rounded-br-md flex items-center justify-center text-xs"
                  aria-label={`Decrease ${stat}`}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm self-end max-w-lg mx-auto w-full sm:w-auto"
      >
        Reset Stats
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run src/components/common/StatTracker.test.tsx`
Expected: All 4 tests pass

- [ ] **Step 5: Update App.tsx to use new StatTracker props**

In `src/App.tsx`, change line 188:
```typescript
<StatTracker initialStats={stats} onStatChange={setStats} />
```
to:
```typescript
<StatTracker stats={stats} onStatChange={setStats} />
```

- [ ] **Step 6: Verify build works**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 7: Commit StatTracker changes**

```bash
git add -A && git commit -m "Convert StatTracker to controlled component

- Remove internal state, receive stats as prop
- Add aria-labels for accessibility
- Update App.tsx to use new prop interface
- Add comprehensive test coverage"
```

---

## Task 5: Convert HarmExperienceTracker to Controlled Component

**Files:**
- Modify: `src/components/common/HarmExperienceTracker.tsx`
- Create: `src/components/common/HarmExperienceTracker.test.tsx`

- [ ] **Step 1: Write failing test for controlled HarmExperienceTracker**

Create `src/components/common/HarmExperienceTracker.test.tsx`:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HarmExperienceTracker } from './HarmExperienceTracker';

describe('HarmExperienceTracker', () => {
  it('displays harm buttons with correct state', () => {
    render(
      <HarmExperienceTracker
        harm={2}
        experience={0}
        onHarmChange={() => {}}
        onExperienceChange={() => {}}
      />
    );

    const harmButtons = screen.getAllByRole('button', { name: /^[1-4]$/ });
    // First 2 should be "pressed" (filled)
    expect(harmButtons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(harmButtons[1]).toHaveAttribute('aria-pressed', 'true');
    expect(harmButtons[2]).toHaveAttribute('aria-pressed', 'false');
    expect(harmButtons[3]).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onHarmChange when harm button clicked', async () => {
    const user = userEvent.setup();
    const onHarmChange = vi.fn();
    render(
      <HarmExperienceTracker
        harm={0}
        experience={0}
        onHarmChange={onHarmChange}
        onExperienceChange={() => {}}
      />
    );

    const harmButtons = screen.getAllByLabelText(/harm level/i);
    await user.click(harmButtons[2]); // Click harm level 3

    expect(onHarmChange).toHaveBeenCalledWith(3);
  });

  it('toggles harm off when clicking current level', async () => {
    const user = userEvent.setup();
    const onHarmChange = vi.fn();
    render(
      <HarmExperienceTracker
        harm={3}
        experience={0}
        onHarmChange={onHarmChange}
        onExperienceChange={() => {}}
      />
    );

    const harmButtons = screen.getAllByLabelText(/harm level/i);
    await user.click(harmButtons[2]); // Click current level (3)

    expect(onHarmChange).toHaveBeenCalledWith(2); // Decrements
  });

  it('calls onExperienceChange when experience button clicked', async () => {
    const user = userEvent.setup();
    const onExperienceChange = vi.fn();
    render(
      <HarmExperienceTracker
        harm={0}
        experience={0}
        onHarmChange={() => {}}
        onExperienceChange={onExperienceChange}
      />
    );

    const expButtons = screen.getAllByLabelText(/experience level/i);
    await user.click(expButtons[3]); // Click experience level 4

    expect(onExperienceChange).toHaveBeenCalledWith(4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run src/components/common/HarmExperienceTracker.test.tsx`
Expected: FAIL - props don't match or aria attributes missing

- [ ] **Step 3: Convert HarmExperienceTracker to controlled component**

Replace `src/components/common/HarmExperienceTracker.tsx`:
```typescript
interface HarmExperienceProps {
  harm: number;
  experience: number;
  onHarmChange: (harm: number) => void;
  onExperienceChange: (experience: number) => void;
}

const HARM_MAX = 4;
const EXPERIENCE_MAX = 5;

/**
 * Tracker for harm (damage) and experience points.
 * Clicking a filled level decrements; clicking unfilled sets to that level.
 */
export function HarmExperienceTracker({
  harm,
  experience,
  onHarmChange,
  onExperienceChange,
}: HarmExperienceProps) {
  const handleHarmClick = (level: number) => {
    if (level === harm) {
      onHarmChange(harm - 1);
    } else {
      onHarmChange(level);
    }
  };

  const handleExperienceClick = (level: number) => {
    if (level === experience) {
      onExperienceChange(experience - 1);
    } else {
      onExperienceChange(level);
    }
  };

  const clearHarm = () => onHarmChange(0);
  const clearExperience = () => onExperienceChange(0);

  return (
    <div className="flex flex-row justify-center gap-12 flex-wrap">
      {/* Harm Tracker */}
      <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700/30 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700/40 transition-colors">
        <label className="text-xl font-medium font-fontin text-gray-700 dark:text-gray-300 mb-2">
          Harm
        </label>
        <div className="flex items-center gap-1">
          {[...Array(HARM_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= harm;
            return (
              <button
                key={index}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  isFilled
                    ? 'bg-blood-red text-white'
                    : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-500 hover:bg-gray-400 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleHarmClick(level)}
                aria-label={`Harm level ${level}`}
                aria-pressed={isFilled}
              >
                {level}
              </button>
            );
          })}
        </div>
        <button
          className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={clearHarm}
        >
          Clear
        </button>
      </div>

      {/* Experience Tracker */}
      <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700/30 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700/40 transition-colors">
        <label className="text-xl font-medium font-fontin text-gray-700 dark:text-gray-300 mb-2">
          Experience
        </label>
        <div className="flex items-center gap-1">
          {[...Array(EXPERIENCE_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= experience;
            return (
              <button
                key={index}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  isFilled
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-500 hover:bg-gray-400 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleExperienceClick(level)}
                aria-label={`Experience level ${level}`}
                aria-pressed={isFilled}
              >
                {level}
              </button>
            );
          })}
        </div>
        <button
          className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={clearExperience}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run src/components/common/HarmExperienceTracker.test.tsx`
Expected: All 4 tests pass

- [ ] **Step 5: Update App.tsx to use new HarmExperienceTracker props**

In `src/App.tsx`, change lines 199-204:
```typescript
<HarmExperienceTracker
  initialHarm={harm}
  initialExperience={experience}
  onHarmChange={setHarm}
  onExperienceChange={setExperience}
/>
```
to:
```typescript
<HarmExperienceTracker
  harm={harm}
  experience={experience}
  onHarmChange={setHarm}
  onExperienceChange={setExperience}
/>
```

- [ ] **Step 6: Verify build works**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 7: Commit HarmExperienceTracker changes**

```bash
git add -A && git commit -m "Convert HarmExperienceTracker to controlled component

- Remove internal state, receive values as props
- Add aria-label and aria-pressed for accessibility
- Update App.tsx to use new prop interface
- Add comprehensive test coverage"
```

---

## Task 6: Convert TextTracker to Controlled Component

**Files:**
- Modify: `src/components/common/TextTracker.tsx`

- [ ] **Step 1: Convert TextTracker to controlled component**

Replace `src/components/common/TextTracker.tsx`:
```typescript
interface TextTrackerProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

const TEXT_AREA_HEIGHT = 120; // pixels - matches design spec

/**
 * Text area for tracking strings or conditions.
 * Fully controlled component.
 */
export function TextTracker({ label, value, onChange }: TextTrackerProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold font-fontin mb-3 text-center tracking-wide">
        {label}
      </h3>
      <div className="w-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700/30 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-red resize-none font-fontin"
          style={{ height: `${TEXT_AREA_HEIGHT}px` }}
          placeholder={`Enter ${label.toLowerCase()}...`}
          aria-label={label}
        />
        <button
          onClick={handleClear}
          className="mt-2 px-4 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm float-right"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update App.tsx to use new TextTracker props**

In `src/App.tsx`, change lines 209-213:
```typescript
<TextTracker
  label="Strings"
  initialText={strings}
  onTextChange={setStrings}
/>
```
to:
```typescript
<TextTracker
  label="Strings"
  value={strings}
  onChange={setStrings}
/>
```

And change lines 214-218:
```typescript
<TextTracker
  label="Conditions"
  initialText={conditions}
  onTextChange={setConditions}
/>
```
to:
```typescript
<TextTracker
  label="Conditions"
  value={conditions}
  onChange={setConditions}
/>
```

- [ ] **Step 3: Verify build works**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit TextTracker changes**

```bash
git add -A && git commit -m "Convert TextTracker to controlled component

- Simplify props: value instead of initialText, onChange instead of onTextChange
- Add aria-label for accessibility
- Update App.tsx to use new prop interface
- Remove internal state management"
```

---

## Task 7: Extract DieVisual Component and Add DiceRoller Tests

**Files:**
- Create: `src/components/common/DieVisual.tsx`
- Modify: `src/components/common/DiceRoller.tsx`
- Create: `src/components/common/DiceRoller.test.tsx`

- [ ] **Step 1: Create DieVisual component**

Create `src/components/common/DieVisual.tsx`:
```typescript
interface DieVisualProps {
  value: number;
}

/**
 * Visual representation of a six-sided die showing a value.
 */
export function DieVisual({ value }: DieVisualProps) {
  return (
    <div className="w-12 h-12 bg-red-900 rounded-lg shadow-inner flex items-center justify-center relative border-2 border-red-950">
      <span className="text-white text-2xl font-bold">{value}</span>
      <div className="absolute inset-0 bg-white/5 rounded-md"></div>
    </div>
  );
}
```

- [ ] **Step 2: Update DiceRoller to import DieVisual**

In `src/components/common/DiceRoller.tsx`:

Add import at top:
```typescript
import { DieVisual } from './DieVisual';
```

Remove the `DieVisual` function definition (lines 100-111) at the bottom of the file.

- [ ] **Step 3: Write DiceRoller tests**

Create `src/components/common/DiceRoller.test.tsx`:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DiceRoller } from './DiceRoller';

describe('DiceRoller', () => {
  const defaultStats = { hot: 1, cold: -1, dark: 2, volatile: 0 };

  it('renders roll button', () => {
    render(<DiceRoller stats={defaultStats} onRoll={() => {}} />);
    expect(screen.getByRole('button', { name: /roll 2d6/i })).toBeInTheDocument();
  });

  it('shows dice results after rolling', async () => {
    const user = userEvent.setup();
    render(<DiceRoller stats={defaultStats} onRoll={() => {}} />);

    await user.click(screen.getByRole('button', { name: /roll 2d6/i }));

    // Should show stat buttons after rolling
    expect(screen.getByRole('button', { name: /with hot/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /with cold/i })).toBeInTheDocument();
  });

  it('calls onRoll with correct total when stat applied', async () => {
    const user = userEvent.setup();
    const onRoll = vi.fn();

    // Mock Math.random to return predictable dice
    const mockRandom = vi.spyOn(Math, 'random');
    mockRandom.mockReturnValueOnce(0.5); // die 1: 4
    mockRandom.mockReturnValueOnce(0.3); // die 2: 2

    render(<DiceRoller stats={defaultStats} onRoll={onRoll} />);

    await user.click(screen.getByRole('button', { name: /roll 2d6/i }));
    await user.click(screen.getByRole('button', { name: /with hot/i }));

    expect(onRoll).toHaveBeenCalledWith({
      dice: [4, 2],
      total: 7, // 4 + 2 + 1 (hot stat)
      stat: 1,
      statName: 'hot',
    });

    mockRandom.mockRestore();
  });

  it('clears roll when clear button clicked', async () => {
    const user = userEvent.setup();
    const onNewRoll = vi.fn();
    render(<DiceRoller stats={defaultStats} onRoll={() => {}} onNewRoll={onNewRoll} />);

    await user.click(screen.getByRole('button', { name: /roll 2d6/i }));
    expect(screen.getByRole('button', { name: /with hot/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.queryByRole('button', { name: /with hot/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run DiceRoller tests**

Run: `npm run test:run src/components/common/DiceRoller.test.tsx`
Expected: All 4 tests pass

- [ ] **Step 5: Commit DieVisual extraction and DiceRoller tests**

```bash
git add -A && git commit -m "Extract DieVisual component and add DiceRoller tests

- Move DieVisual to separate file for better organization
- Add comprehensive DiceRoller test coverage
- Test dice rolling, stat application, and clear functionality"
```

---

## Task 8: Integrate useCharacter Hook into App

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Refactor App.tsx to use useCharacter hook**

Replace `src/App.tsx`:
```typescript
import { useState, useEffect } from 'react';
import { DiceRoller } from './components/common/DiceRoller';
import { StatTracker } from './components/common/StatTracker';
import { HarmExperienceTracker } from './components/common/HarmExperienceTracker';
import { TextTracker } from './components/common/TextTracker';
import { useCharacter } from './hooks/useCharacter';

function App() {
  const {
    character,
    updateName,
    updateStats,
    updateHarm,
    updateExperience,
    updateStrings,
    updateConditions,
    resetCharacter,
  } = useCharacter();

  const [finalRoll, setFinalRoll] = useState<{ total: number; statName: string } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const handleRoll = (result: { dice: [number, number]; total: number; stat: number; statName: string }) => {
    setFinalRoll({ total: result.total, statName: result.statName });
  };

  const clearRoll = () => {
    setFinalRoll(null);
  };

  const handleResetCharacter = () => {
    if (window.confirm('Are you sure you want to reset your character data?')) {
      resetCharacter();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-gradient-to-r from-blood-red to-red-900 text-white p-6 shadow-md">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1
            className="text-3xl font-yataghan tracking-wide"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            Monsterhearts 2 Player Sheet
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </div>
      </header>
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold font-fontin mb-4 text-center tracking-wide">
              Character
            </h2>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => updateName(e.target.value)}
                  placeholder="Enter character name..."
                  maxLength={50}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-red text-lg text-center font-fontin"
                  aria-label="Character name"
                />
                <button
                  onClick={() => updateName('')}
                  className="mt-2 px-4 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm float-right"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: Dice Roller and Stats */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold font-fontin mb-6 text-center tracking-wide">
                  Dice Roller
                </h2>
                <DiceRoller stats={character.stats} onRoll={handleRoll} onNewRoll={clearRoll} />
              </div>

              {finalRoll && (
                <div className="mb-8 text-center final-roll-result">
                  <div className="inline-block px-8 py-6 bg-gradient-to-br from-blood-red/20 to-red-900/20 border-2 border-blood-red rounded-xl shadow-2xl">
                    <p className="text-2xl font-fontin text-gray-700 dark:text-gray-200 mb-2">
                      Result with <span className="text-white font-bold bg-blood-red px-3 py-1 rounded-md shadow-md">{finalRoll.statName.toUpperCase()}</span>
                    </p>
                    <div className="text-6xl font-bold text-gray-900 dark:text-white drop-shadow-lg">
                      {finalRoll.total}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold font-fontin mb-6 text-center tracking-wide">
                  Stats
                </h2>
                <StatTracker stats={character.stats} onStatChange={updateStats} />
              </div>
            </div>

            {/* Middle column: Harm and Experience */}
            <div>
              <h2 className="text-2xl font-semibold font-fontin mb-6 text-center tracking-wide">
                Status
              </h2>
              <HarmExperienceTracker
                harm={character.harm}
                experience={character.experience}
                onHarmChange={updateHarm}
                onExperienceChange={updateExperience}
              />
            </div>

            {/* Right column: Strings and Conditions */}
            <div className="space-y-8">
              <TextTracker
                label="Strings"
                value={character.strings}
                onChange={updateStrings}
              />
              <TextTracker
                label="Conditions"
                value={character.conditions}
                onChange={updateConditions}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-gray-600 dark:text-gray-400 mt-8">
        <p className="font-fontin">
          A character sheet for Monsterhearts 2
        </p>
        <button
          onClick={handleResetCharacter}
          className="mt-2 text-xs text-gray-600 dark:text-gray-500 hover:text-blood-red transition-colors"
        >
          Reset Character
        </button>
      </footer>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Update App.test.tsx with more tests**

Replace `src/App.test.tsx`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('Monsterhearts 2 Player Sheet')).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    render(<App />);
    expect(screen.getByText('Character')).toBeInTheDocument();
    expect(screen.getByText('Dice Roller')).toBeInTheDocument();
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Strings')).toBeInTheDocument();
    expect(screen.getByText('Conditions')).toBeInTheDocument();
  });

  it('toggles dark mode', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggleButton = screen.getByLabelText('Toggle dark mode');

    // Default is dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await user.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('saves character name to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText('Character name');
    await user.type(nameInput, 'Test Character');

    const saved = JSON.parse(localStorage.getItem('monsterhearts-character') || '{}');
    expect(saved.name).toBe('Test Character');
  });
});
```

- [ ] **Step 3: Run all tests**

Run: `npm run test:run`
Expected: All tests pass

- [ ] **Step 4: Verify app works in browser**

Run: `npm run dev`
Expected: App loads, all functionality works (manually verify)

- [ ] **Step 5: Commit App refactor**

```bash
git add -A && git commit -m "Refactor App to use useCharacter hook

- Replace 8 useState calls with single useCharacter hook
- Update component props to match new controlled interfaces
- Add aria-label to character name input
- Simplify App.tsx from ~240 lines to ~170 lines
- Expand App tests for core functionality"
```

---

## Task 9: Update Documentation

**Files:**
- Modify: `README.md`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create app favicon**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="15" fill="#8B0000"/>
  <text x="50" y="68" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="white" text-anchor="middle">2d6</text>
</svg>
```

- [ ] **Step 2: Update index.html to use new favicon**

In `index.html`, change:
```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```
to:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- [ ] **Step 3: Update README.md**

Replace `README.md`:
```markdown
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

MIT License; see the LICENSE file for details.
```

- [ ] **Step 4: Verify changes**

Run: `npm run build && npm run test:run`
Expected: Build succeeds, all tests pass

- [ ] **Step 5: Commit documentation updates**

```bash
git add -A && git commit -m "Update documentation and add favicon

- Add custom 2d6 favicon
- Expand README with architecture overview
- Add development commands section
- Document tech stack"
```

---

## Task 10: Final Cleanup

**Files:**
- Modify: `src/components/common/DiceRoller.tsx` (fix semicolons if needed)
- Run: dependency updates

- [ ] **Step 1: Update browserslist database**

```bash
npx update-browserslist-db@latest
```

- [ ] **Step 2: Run final lint check**

Run: `npm run lint`
Expected: No errors (warnings OK)

- [ ] **Step 3: Run full test suite**

Run: `npm run test:run`
Expected: All tests pass

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no warnings

- [ ] **Step 5: Commit final cleanup**

```bash
git add -A && git commit -m "Final cleanup and dependency updates

- Update browserslist database
- Ensure consistent code style"
```

---

## Summary

After completing all tasks, the codebase will have:

- **Architecture**: Clean separation with `useCharacter` hook managing all state
- **Testing**: ~20 tests covering hook, components, and app integration
- **Accessibility**: Proper aria-labels on all interactive elements
- **Documentation**: Comprehensive README with architecture overview
- **Code Quality**: Fixed configs, no console.logs, consistent style
