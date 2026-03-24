# UI Polish & Component Redesign

**Date**: 2026-03-23
**Status**: Approved

## Overview

Polish the Monsterhearts 2 character sheet UI to feel more cohesive and intentional. Improve mobile usability while preserving the dark gothic aesthetic.

## Goals

- Fix inconsistent styling that makes the app feel "developer-designed"
- Improve mobile usability (larger touch targets, better stacking)
- Give key components more visual personality
- Add micro-interactions that make the app feel crafted

## Non-Goals

- Changing the overall aesthetic (keep blood-red + dark gothic)
- Adding new features or functionality
- Redesigning the information architecture

---

## Design System Foundations

### Spacing Scale

Use consistent 4px-based spacing throughout:
- `4px` — tight (icon padding)
- `8px` — compact (between related elements)
- `12px` — default (input padding)
- `16px` — comfortable (card padding)
- `24px` — spacious (between sections)
- `32px` — large (major section gaps)
- `48px` — extra-large (page margins on desktop)

### Touch Targets

Minimum **44×44px** for all interactive elements. Current stat increment buttons (~20px) must grow significantly.

### Typography Hierarchy

| Element | Font | Size | Style |
|---------|------|------|-------|
| Page title | Yataghan | 30px | Normal |
| Section headers | Yataghan | 24px | Normal |
| Component labels | Fontin | 14px | Uppercase, letter-spacing: 0.05em |
| Values/data | Fontin | 20-28px | Bold |
| Body text | Fontin | 16px | Normal |
| Button text | Fontin | 16px | Medium |
| Small/tertiary text | Fontin | 14px | Normal |

### Button Tiers

| Tier | Use Case | Style |
|------|----------|-------|
| Primary | Main actions (Roll 2d6) | Blood-red gradient, white text, shadow |
| Secondary | Supporting actions (With Hot) | Charcoal gradient, white text, shadow |
| Tertiary | Minor actions (Clear, Reset) | Ghost/text style, no background, subtle hover |

### Border Radius

- Cards/containers: `8px`
- Buttons/inputs: `6px`
- Small elements (stat boxes, harm squares): `4px`

---

## Mobile Layout Strategy

### Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Desktop (1024px+) | Three columns |
| Tablet (640-1023px) | Two columns: dice+stats / harm+XP+text |
| Mobile (<640px) | Single column, reordered |

### Mobile Section Order

Priority based on frequency of use during play:
1. Dice Roller (constant use)
2. Stats (needed after every roll)
3. Harm/Experience (occasional updates)
4. Strings/Conditions (reference material)

### Mobile Enhancements

- **Sticky header**: Character name stays visible when scrolling
- **Collapsible sections** (optional): Strings/Conditions can collapse to headers on mobile

---

## Component Redesigns

### Dice Roller

**Container:**
- Distinct card with subtle dark border
- Slightly elevated shadow
- Faint inner glow — should feel like the centerpiece

**Roll button:**
- Minimum 48px height
- Full-width on mobile
- Subtle pulse/glow on hover

**Dice display:**
- 56×56px per die (up from current)
- Inset shadow for physical dice feel
- Tumble animation on roll (subtle rotation + fade-in, 300ms)

**Stat buttons:**
- 48px height minimum
- 2×2 grid on mobile (currently 4-across)
- Subtle highlight when hovered

**Result display:**
- Keep slide-in-bounce animation
- Add color context: 10+ success glow, 6- subtle red tint

### Stat Tracker

**Stat box:**
- Each stat in a proper card (padding, subtle border, rounded corners)
- Label: uppercase, letter-spaced, above value
- Value: 28px+, centered, colored (red negative, green positive, neutral zero)
- +/- buttons: 44×44px, flanking value (or below on mobile)

**Value coloring:**
- Negative: red text, optional faint red card tint
- Positive: green text, optional faint green card tint
- Zero: neutral text

**Grid layout:**
- Desktop: 4 across
- Mobile: 2×2 grid

**Reset button:** Tertiary style, right-aligned below grid

### Harm/Experience Tracker

**Box sizing:** 48×48px each (up from current)

**Harm (4 boxes):**
- Filled: blood-red with subtle "wounded" visual
- Unfilled: dark/muted
- At 4 harm: subtle danger pulse on row

**Experience (5 boxes):**
- Filled: green
- Unfilled: muted
- At 5 XP: brief celebration glow/shimmer

**Interactions:**
- Subtle press animation (scale down on tap)
- Brief pulse when filling a box

**Layout:**
- Desktop: side by side
- Mobile: stacked vertically

### Text Trackers (Strings/Conditions)

**Container:** Subtle card wrapper matching other components

**Labels:** Uppercase, letter-spaced, above textarea

**Textarea:**
- Taller on desktop, shorter on mobile
- Subtle inner shadow
- Blood-red focus ring

**Clear button:**
- Tertiary style, right-aligned
- Only show when content exists (optional)

---

## Micro-interactions & Animations

### Timing Standards

| Interaction | Duration |
|-------------|----------|
| Hover transitions | 150ms |
| Press/active feedback | 100ms |
| Color/background changes | 150-200ms |
| Dice roll animation | 300ms |
| Result reveal | 500ms |
| Theme toggle | 200ms |

### Hover States (Desktop)

All interactive elements: slight lift, brightness change, or glow. Consistent 150ms timing.

### Press/Active States

Buttons scale to 98% on press. Quick and snappy.

### Specific Animations

| Element | Animation |
|---------|-----------|
| Dice values | Tumble/rotation on appear |
| Final result | Slide-in-bounce (keep current) |
| Harm/XP boxes | Brief pulse on fill |
| Theme toggle | Smooth 200ms crossfade |

### Result Color Context

- **10+ (success)**: Brighter glow
- **7-9 (mixed)**: Neutral (current)
- **6- (failure)**: Subtle red tint

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Add spacing variables, animation keyframes, updated component classes |
| `tailwind.config.js` | Add spacing scale, animation utilities |
| `src/App.tsx` | Update layout for responsive breakpoints, add sticky header |
| `src/components/common/DiceRoller.tsx` | Resize elements, add animations, responsive grid |
| `src/components/common/DieVisual.tsx` | Larger size, inset shadow, tumble animation |
| `src/components/common/StatTracker.tsx` | Card styling, larger buttons, responsive 2×2 |
| `src/components/common/HarmExperienceTracker.tsx` | Larger boxes, visual feedback, animations |
| `src/components/common/TextTracker.tsx` | Card wrapper, improved textarea styling |

---

## Success Criteria

- All touch targets ≥44px
- Consistent spacing using defined scale
- Mobile layout prioritizes frequent interactions
- Components feel cohesive (same card style, typography, spacing)
- Animations are subtle but noticeable (not jarring or slow)
- App feels "designed" rather than "developer-built"
