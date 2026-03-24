# UI Polish & Component Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the Monsterhearts 2 character sheet UI to feel cohesive and intentional, with improved mobile usability.

**Architecture:** Update design system foundations (spacing, typography, buttons) in CSS/Tailwind, then systematically redesign each component with larger touch targets, card styling, and micro-interactions. Mobile-first responsive approach.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, CSS animations

**Spec:** `docs/superpowers/specs/2026-03-23-ui-polish-design.md`

---

## File Structure

### Modified Files
| Path | Changes |
|------|---------|
| `tailwind.config.js` | Add custom spacing, animation utilities, extend theme |
| `src/index.css` | Add CSS custom properties, animation keyframes, component classes |
| `src/App.tsx` | Responsive layout, sticky character header, section reordering |
| `src/components/common/DiceRoller.tsx` | Card container, larger buttons, responsive stat grid |
| `src/components/common/DieVisual.tsx` | Larger size (56px), inset shadow, tumble animation |
| `src/components/common/StatTracker.tsx` | Card per stat, 44px buttons, 2×2 mobile grid |
| `src/components/common/HarmExperienceTracker.tsx` | 48px boxes, pulse animations, mobile stack |
| `src/components/common/TextTracker.tsx` | Card wrapper, improved textarea, tertiary clear button |

---

## Task 1: Design System Foundations

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Update Tailwind config with design tokens**

In `tailwind.config.js`, update the theme.extend section:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'blood-red': '#8B0000',
                'charcoal': '#36454F',
            },
            fontFamily: {
                'yataghan': ['"Yataghan-Regular"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
                'fontin': ['"Fontin-Regular"', 'Georgia', 'Garamond', '"Times New Roman"', 'Times', 'serif'],
                'fontin-bold': ['"Fontin-Bold"', 'serif'],
                'fontin-italic': ['"Fontin-Italic"', 'serif'],
                'fontin-sc': ['"Fontin-SmallCaps"', 'serif'],
            },
            spacing: {
                '11': '2.75rem', // 44px - touch target
                '12': '3rem',    // 48px - large touch target
                '14': '3.5rem',  // 56px - dice size
            },
            borderRadius: {
                'card': '8px',
                'button': '6px',
                'small': '4px',
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
            },
            animation: {
                'tumble': 'tumble 300ms ease-out',
                'pulse-success': 'pulse-success 600ms ease-out',
                'pulse-danger': 'pulse-danger 600ms ease-out',
                'press': 'press 100ms ease-out',
            },
            keyframes: {
                tumble: {
                    '0%': { transform: 'rotate(-10deg) scale(0.8)', opacity: '0' },
                    '50%': { transform: 'rotate(5deg) scale(1.05)' },
                    '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
                },
                'pulse-success': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
                    '50%': { boxShadow: '0 0 20px 4px rgba(34, 197, 94, 0.4)' },
                },
                'pulse-danger': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 0, 0, 0)' },
                    '50%': { boxShadow: '0 0 20px 4px rgba(139, 0, 0, 0.4)' },
                },
                press: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.98)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
```

- [ ] **Step 2: Update CSS with component classes and variables**

Replace the component styles section in `src/index.css`:

```css
/* Component Styles */
@layer components {

  /* Card container - used for all component wrappers */
  .card {
    @apply bg-white dark:bg-gray-800/50 rounded-card p-4 border border-gray-200 dark:border-gray-700/50 shadow-sm;
  }

  .card-elevated {
    @apply card shadow-md dark:shadow-lg dark:shadow-black/20;
  }

  /* Button Base */
  .btn {
    @apply px-4 py-2 rounded-button font-medium transition-all duration-150 min-h-[44px] flex items-center justify-center;
  }

  .btn:active {
    @apply scale-[0.98];
  }

  /* Primary Button */
  .btn-primary {
    @apply bg-gradient-to-br from-blood-red to-red-900 text-white hover:from-red-700 hover:to-red-800 shadow-md border border-red-900/30 hover:shadow-lg;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  }

  /* Secondary Button */
  .btn-secondary {
    @apply bg-gradient-to-br from-charcoal to-gray-700 text-white hover:from-gray-600 hover:to-gray-600 shadow-md border border-gray-600/30 hover:shadow-lg;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  }

  /* Tertiary Button (ghost style) */
  .btn-tertiary {
    @apply text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-button px-3 py-1.5 text-sm transition-colors duration-150;
  }

  /* Component label style */
  .component-label {
    @apply text-sm font-medium font-fontin text-gray-600 dark:text-gray-400 uppercase tracking-wider;
  }

  /* Value display style */
  .value-display {
    @apply text-2xl font-bold font-fontin;
  }

  /* Touch target helper - ensures minimum 44px */
  .touch-target {
    @apply min-w-[44px] min-h-[44px];
  }
}
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors

- [ ] **Step 4: Commit design system foundations**

```bash
git add tailwind.config.js src/index.css
git commit -m "Add design system foundations

- Add custom spacing scale for touch targets (44px, 48px, 56px)
- Add consistent border radius tokens (card, button, small)
- Add animation keyframes (tumble, pulse-success, pulse-danger, press)
- Add component classes (card, btn tiers, component-label, value-display)
- Standardize transition durations"
```

---

## Task 2: App Layout & Responsive Breakpoints

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update App.tsx with responsive layout and sticky header**

The key changes:
1. Sticky character name section on mobile
2. Responsive grid with proper breakpoints
3. Reordered sections for mobile (dice → stats → harm/xp → text)

Update the return statement in `src/App.tsx`. Replace the entire JSX from the opening `<div className="min-h-screen...` through the closing `</div>`:

```tsx
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-gradient-to-r from-blood-red to-red-900 text-white p-4 sm:p-6 shadow-md">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1
            className="text-2xl sm:text-3xl font-yataghan tracking-wide"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            Monsterhearts 2
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-button bg-white/10 hover:bg-white/20 transition-colors duration-150 touch-target flex items-center justify-center"
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

      {/* Sticky character name on mobile */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sm:relative sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none sm:border-none">
        <div className="container mx-auto max-w-6xl p-4 sm:p-6 sm:pb-0">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <input
                type="text"
                value={character.name}
                onChange={(e) => updateName(e.target.value)}
                placeholder="Character name..."
                maxLength={50}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-button text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-red text-lg text-center font-fontin"
                aria-label="Character name"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 sm:p-6 max-w-6xl">
        {/* Main content grid - responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Dice Roller - always first on mobile */}
          <div className="md:col-span-1 lg:col-span-1 order-1">
            <div className="card-elevated">
              <h2 className="component-label text-center mb-4">Dice Roller</h2>
              <DiceRoller stats={character.stats} onRoll={handleRoll} onNewRoll={clearRoll} />
            </div>

            {finalRoll && (
              <div className="mt-4 text-center final-roll-result">
                <div className={`inline-block px-6 py-4 rounded-card border-2 shadow-xl ${
                  finalRoll.total >= 10
                    ? 'bg-green-900/20 border-green-600 dark:border-green-500'
                    : finalRoll.total <= 6
                      ? 'bg-red-900/20 border-blood-red'
                      : 'bg-gradient-to-br from-blood-red/20 to-red-900/20 border-blood-red'
                }`}>
                  <p className="text-lg font-fontin text-gray-700 dark:text-gray-200 mb-1">
                    with <span className="font-bold uppercase">{finalRoll.statName}</span>
                  </p>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {finalRoll.total}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats - second on mobile */}
          <div className="md:col-span-1 lg:col-span-1 order-2">
            <div className="card">
              <h2 className="component-label text-center mb-4">Stats</h2>
              <StatTracker stats={character.stats} onStatChange={updateStats} />
            </div>
          </div>

          {/* Harm & Experience - third on mobile */}
          <div className="md:col-span-2 lg:col-span-1 order-3 lg:order-3">
            <div className="card">
              <h2 className="component-label text-center mb-4">Status</h2>
              <HarmExperienceTracker
                harm={character.harm}
                experience={character.experience}
                onHarmChange={updateHarm}
                onExperienceChange={updateExperience}
              />
            </div>
          </div>

          {/* Strings - fourth on mobile */}
          <div className="md:col-span-1 lg:col-span-1 order-4 lg:order-4">
            <TextTracker
              label="Strings"
              value={character.strings}
              onChange={updateStrings}
            />
          </div>

          {/* Conditions - fifth on mobile */}
          <div className="md:col-span-1 lg:col-span-2 order-5 lg:order-5">
            <TextTracker
              label="Conditions"
              value={character.conditions}
              onChange={updateConditions}
            />
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-500">
        <button
          onClick={handleResetCharacter}
          className="btn-tertiary"
        >
          Reset Character
        </button>
      </footer>
    </div>
  );
```

- [ ] **Step 2: Verify app renders correctly**

Run: `npm run dev`
Expected: App loads, layout responds to window resize

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build completes with no errors

- [ ] **Step 4: Commit layout changes**

```bash
git add src/App.tsx
git commit -m "Update App layout with responsive breakpoints

- Add sticky character name on mobile
- Implement responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Reorder sections for mobile priority (dice → stats → status → text)
- Apply card styling to component sections
- Add result color context (green for 10+, red for 6-)
- Convert reset button to tertiary style"
```

---

## Task 3: Dice Roller & DieVisual Redesign

**Files:**
- Modify: `src/components/common/DiceRoller.tsx`
- Modify: `src/components/common/DieVisual.tsx`

- [ ] **Step 1: Update DieVisual with larger size and animations**

Replace the contents of `src/components/common/DieVisual.tsx`:

```tsx
interface DieVisualProps {
  value: number;
  animate?: boolean;
}

/**
 * Visual representation of a six-sided die showing a value.
 * 56x56px with inset shadow for physical dice feel.
 */
export function DieVisual({ value, animate = false }: DieVisualProps) {
  return (
    <div
      className={`w-14 h-14 bg-gradient-to-br from-red-800 to-red-950 rounded-small shadow-lg flex items-center justify-center relative border-2 border-red-950 ${
        animate ? 'animate-tumble' : ''
      }`}
      style={{
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      <span className="text-white text-3xl font-bold drop-shadow-md">{value}</span>
    </div>
  );
}
```

- [ ] **Step 2: Update DiceRoller with improved layout and touch targets**

Replace the contents of `src/components/common/DiceRoller.tsx`:

```tsx
import { useCallback, useState } from 'react';
import { Stats } from '../../types/stats';
import { DieVisual } from './DieVisual';

interface DiceRollerProps {
    stats: Stats;
    onRoll: (result: RollResult) => void;
    onNewRoll?: () => void;
}

interface RollResult {
    dice: [number, number];
    total: number;
    stat: number;
    statName: string;
}

export function DiceRoller({ stats, onRoll, onNewRoll }: DiceRollerProps) {
    const [lastRoll, setLastRoll] = useState<[number, number] | null>(null);
    const [rollKey, setRollKey] = useState(0);

    const roll = useCallback(() => {
        if (onNewRoll) {
            onNewRoll();
        }

        const dice = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
        ] as [number, number];
        setLastRoll(dice);
        setRollKey(k => k + 1);
    }, [onNewRoll]);

    const applyStat = useCallback((statName: keyof Stats) => {
        if (!lastRoll) return;
        const stat = stats[statName];
        const total = lastRoll.reduce((a, b) => a + b) + stat;
        onRoll({ dice: lastRoll, total, stat, statName });
    }, [lastRoll, stats, onRoll]);

    const clearRoll = useCallback(() => {
        setLastRoll(null);
        if (onNewRoll) {
            onNewRoll();
        }
    }, [onNewRoll]);

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={roll}
                className="btn btn-primary w-full sm:w-auto px-8 py-3 text-lg font-fontin"
            >
                Roll 2d6
            </button>

            {lastRoll && (
                <>
                    <div className="flex items-center gap-3 py-2" key={rollKey}>
                        <DieVisual value={lastRoll[0]} animate />
                        <span className="text-2xl text-gray-400 dark:text-gray-500">+</span>
                        <DieVisual value={lastRoll[1]} animate />
                        <span className="text-2xl text-gray-400 dark:text-gray-500">=</span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white min-w-[2ch] text-center">
                            {lastRoll.reduce((a, b) => a + b)}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                        {(Object.keys(stats) as Array<keyof Stats>).map((statName) => (
                            <button
                                key={statName}
                                onClick={() => applyStat(statName)}
                                className="btn btn-secondary text-sm py-3"
                            >
                                <span className="capitalize">{statName}</span>
                                <span className="ml-1 opacity-75">
                                    {stats[statName] >= 0 ? '+' : ''}{stats[statName]}
                                </span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={clearRoll}
                        className="btn-tertiary"
                    >
                        Clear
                    </button>
                </>
            )}
        </div>
    );
}
```

- [ ] **Step 3: Run tests to ensure nothing broke**

Run: `npm run test:run`
Expected: All tests pass (some may need adjustments for new class names)

- [ ] **Step 4: Verify visual appearance**

Run: `npm run dev`
Expected: Dice roller shows larger dice with tumble animation on roll, 2×2 stat grid on mobile

- [ ] **Step 5: Commit DiceRoller changes**

```bash
git add src/components/common/DiceRoller.tsx src/components/common/DieVisual.tsx
git commit -m "Redesign DiceRoller and DieVisual components

- Increase die size to 56x56px with inset shadow
- Add tumble animation on dice roll
- Show stat modifier in stat buttons (+1, -2, etc.)
- Convert to 2x2 grid on mobile, 4-across on desktop
- Full-width roll button on mobile
- Use tertiary style for clear button
- Minimum 44px touch targets on all buttons"
```

---

## Task 4: StatTracker Redesign

**Files:**
- Modify: `src/components/common/StatTracker.tsx`

- [ ] **Step 1: Update StatTracker with card styling and larger touch targets**

Replace the contents of `src/components/common/StatTracker.tsx`:

```tsx
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

  const getStatColor = (value: number): string => {
    if (value < 0) return 'text-red-500 dark:text-red-400';
    if (value > 0) return 'text-green-600 dark:text-green-400';
    return 'text-gray-900 dark:text-white';
  };

  const getStatBgTint = (value: number): string => {
    if (value < 0) return 'bg-red-50 dark:bg-red-950/20';
    if (value > 0) return 'bg-green-50 dark:bg-green-950/20';
    return 'bg-gray-50 dark:bg-gray-800/50';
  };

  const handleReset = () => {
    onStatChange({ hot: 0, cold: 0, dark: 0, volatile: 0 });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.entries(stats) as [keyof Stats, number][]).map(([stat, value]) => (
          <div
            key={stat}
            className={`flex flex-col items-center p-3 rounded-card border border-gray-200 dark:border-gray-700/50 transition-colors duration-150 ${getStatBgTint(value)}`}
          >
            <label className="component-label mb-2">
              {stat}
            </label>

            <div className="flex items-center gap-1">
              <button
                onClick={() => updateStat(stat, -1)}
                disabled={value <= STAT_MIN}
                className="touch-target flex items-center justify-center rounded-button bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 text-gray-700 dark:text-gray-200 text-xl font-bold"
                aria-label={`Decrease ${stat}`}
              >
                −
              </button>

              <span
                className={`value-display w-12 text-center ${getStatColor(value)}`}
                aria-label={`${stat} stat value`}
              >
                {value >= 0 ? `+${value}` : value}
              </span>

              <button
                onClick={() => updateStat(stat, 1)}
                disabled={value >= STAT_MAX}
                className="touch-target flex items-center justify-center rounded-button bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 text-gray-700 dark:text-gray-200 text-xl font-bold"
                aria-label={`Increase ${stat}`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="btn-tertiary"
        >
          Reset Stats
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run tests**

Run: `npm run test:run src/components/common/StatTracker.test.tsx`
Expected: Tests pass (may need minor selector updates)

- [ ] **Step 3: Verify visual appearance**

Run: `npm run dev`
Expected: Stats show in cards with colored tints, large +/- buttons, 2×2 on mobile

- [ ] **Step 4: Commit StatTracker changes**

```bash
git add src/components/common/StatTracker.tsx
git commit -m "Redesign StatTracker with card styling

- Each stat in its own card with subtle background tint
- Tint color reflects value (red negative, green positive)
- 44x44px +/- buttons for easy tapping
- Display values with +/- prefix
- 2x2 grid on mobile, 4-across on desktop
- Tertiary style reset button"
```

---

## Task 5: HarmExperienceTracker Redesign

**Files:**
- Modify: `src/components/common/HarmExperienceTracker.tsx`

- [ ] **Step 1: Update HarmExperienceTracker with larger boxes and animations**

Replace the contents of `src/components/common/HarmExperienceTracker.tsx`:

```tsx
import { useState, useEffect } from 'react';

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
  const [animatingHarm, setAnimatingHarm] = useState<number | null>(null);
  const [animatingXP, setAnimatingXP] = useState<number | null>(null);

  const handleHarmClick = (level: number) => {
    if (level === harm) {
      onHarmChange(harm - 1);
    } else {
      setAnimatingHarm(level);
      onHarmChange(level);
    }
  };

  const handleExperienceClick = (level: number) => {
    if (level === experience) {
      onExperienceChange(experience - 1);
    } else {
      setAnimatingXP(level);
      onExperienceChange(level);
    }
  };

  useEffect(() => {
    if (animatingHarm !== null) {
      const timer = setTimeout(() => setAnimatingHarm(null), 300);
      return () => clearTimeout(timer);
    }
  }, [animatingHarm]);

  useEffect(() => {
    if (animatingXP !== null) {
      const timer = setTimeout(() => setAnimatingXP(null), 300);
      return () => clearTimeout(timer);
    }
  }, [animatingXP]);

  const clearHarm = () => onHarmChange(0);
  const clearExperience = () => onExperienceChange(0);

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-8">
      {/* Harm Tracker */}
      <div className="flex flex-col items-center">
        <label className="component-label mb-3">Harm</label>
        <div className={`flex items-center gap-2 ${harm >= HARM_MAX ? 'animate-pulse-danger' : ''}`}>
          {[...Array(HARM_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= harm;
            const isAnimating = animatingHarm === level;
            return (
              <button
                key={index}
                className={`w-12 h-12 rounded-small flex items-center justify-center transition-all duration-150 font-bold text-lg ${
                  isFilled
                    ? 'bg-gradient-to-br from-blood-red to-red-900 text-white shadow-md border border-red-900'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                } ${isAnimating ? 'scale-110' : ''}`}
                onClick={() => handleHarmClick(level)}
                aria-label={`Harm level ${level}`}
                aria-pressed={isFilled}
              >
                {isFilled ? '✕' : level}
              </button>
            );
          })}
        </div>
        <button className="btn-tertiary mt-2" onClick={clearHarm}>
          Clear
        </button>
      </div>

      {/* Experience Tracker */}
      <div className="flex flex-col items-center">
        <label className="component-label mb-3">Experience</label>
        <div className={`flex items-center gap-2 ${experience >= EXPERIENCE_MAX ? 'animate-pulse-success' : ''}`}>
          {[...Array(EXPERIENCE_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= experience;
            const isAnimating = animatingXP === level;
            return (
              <button
                key={index}
                className={`w-12 h-12 rounded-small flex items-center justify-center transition-all duration-150 font-bold text-lg ${
                  isFilled
                    ? 'bg-gradient-to-br from-green-600 to-green-800 text-white shadow-md border border-green-800'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                } ${isAnimating ? 'scale-110' : ''}`}
                onClick={() => handleExperienceClick(level)}
                aria-label={`Experience level ${level}`}
                aria-pressed={isFilled}
              >
                {isFilled ? '★' : level}
              </button>
            );
          })}
        </div>
        <button className="btn-tertiary mt-2" onClick={clearExperience}>
          Clear
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run tests**

Run: `npm run test:run src/components/common/HarmExperienceTracker.test.tsx`
Expected: Tests pass

- [ ] **Step 3: Verify visual appearance**

Run: `npm run dev`
Expected: 48px boxes, pulse animation at max harm/XP, icons when filled

- [ ] **Step 4: Commit HarmExperienceTracker changes**

```bash
git add src/components/common/HarmExperienceTracker.tsx
git commit -m "Redesign HarmExperienceTracker with animations

- Increase box size to 48x48px for better touch targets
- Add pulse animation when reaching max (danger for harm, success for XP)
- Show icons when filled (✕ for harm, ★ for XP)
- Scale animation on fill
- Stack vertically on mobile
- Tertiary style clear buttons"
```

---

## Task 6: TextTracker Redesign

**Files:**
- Modify: `src/components/common/TextTracker.tsx`

- [ ] **Step 1: Update TextTracker with card wrapper and improved styling**

Replace the contents of `src/components/common/TextTracker.tsx`:

```tsx
interface TextTrackerProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

/**
 * Text area for tracking strings or conditions.
 * Fully controlled component.
 */
export function TextTracker({ label, value, onChange }: TextTrackerProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="card h-full flex flex-col">
      <label className="component-label mb-3">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-h-[100px] sm:min-h-[120px] w-full px-3 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-button text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-red resize-none font-fontin text-sm"
        style={{
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
        placeholder={`Enter ${label.toLowerCase()}...`}
        aria-label={label}
      />
      {value && (
        <div className="flex justify-end mt-2">
          <button
            onClick={handleClear}
            className="btn-tertiary"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify visual appearance**

Run: `npm run dev`
Expected: TextTrackers have card styling, inset textarea, clear only shows when has content

- [ ] **Step 3: Commit TextTracker changes**

```bash
git add src/components/common/TextTracker.tsx
git commit -m "Redesign TextTracker with card wrapper

- Wrap in card container matching other components
- Add inset shadow to textarea
- Only show clear button when content exists
- Adjust height for mobile (shorter) vs desktop (taller)
- Use consistent component-label styling"
```

---

## Task 7: Final Polish & Test Fixes

**Files:**
- Modify: Test files as needed
- Verify: All functionality

- [ ] **Step 1: Run full test suite and fix any failures**

Run: `npm run test:run`

If tests fail due to class name changes or missing elements, update the test selectors to match new structure. Common fixes:
- Update button queries to use new class names
- Adjust for removed/changed elements

- [ ] **Step 2: Run build to verify no TypeScript errors**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Manual verification checklist**

Run `npm run dev` and verify:
- [ ] All touch targets are at least 44px (use browser dev tools)
- [ ] Mobile layout stacks correctly (<640px)
- [ ] Tablet shows 2 columns (640-1023px)
- [ ] Desktop shows 3 columns (1024px+)
- [ ] Dark/light mode toggle works smoothly
- [ ] Dice tumble animation plays on roll
- [ ] Harm/XP pulse at max values
- [ ] Result shows correct color (green 10+, red 6-)
- [ ] All buttons have hover/active states

- [ ] **Step 4: Run lint check**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 5: Commit any test fixes**

```bash
git add -A
git commit -m "Fix tests and final polish

- Update test selectors for new component structure
- Ensure all tests pass with redesigned components"
```

---

## Summary

After completing all tasks, the app will have:

- **Design System**: Consistent spacing, typography, and button tiers
- **Mobile-First**: Proper breakpoints, sticky header, reordered content
- **Polished Components**: Card styling, larger touch targets, visual personality
- **Micro-interactions**: Animations on dice roll, harm/XP fill, theme toggle
- **Cohesive Feel**: Everything uses the same visual language

Total commits: 7
