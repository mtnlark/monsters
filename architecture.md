### 1. Architecture outline  

| Layer | Choices & Rationale |
|-------|--------------------|
| **Build tooling** | **Vite + TypeScript** (type safety, better DX). Add `@vitejs/plugin-react-swc` for faster builds. |
| **Framework** | **React 18 + TypeScript** (type-safe hooks, better error catching). Use `useReducer` for complex state. |
| **Styling** | **Tailwind CSS + CSS Modules** (scoped styles for complex components). Add `@tailwindcss/forms` for better form styling. |
| **State / persistence** | `useReducer` + `useLocalStorage` with schema validation via Zod. Add error boundaries and loading states. |
| **Folder structure** |
```
monsterhearts-sheet/
│  index.html
│  vite.config.ts
│  tsconfig.json
│  .eslintrc.js
│  .prettierrc
│  package.json
└─ src/
   │  main.tsx
   │  App.tsx
   │  types/
   │    index.ts
   │    schema.ts
   ├─ components/
   │  ├─ common/
   │  │  DiceRoller.tsx
   │  │  CheckboxTracker.tsx
   │  │  StringList.tsx
   │  │  TagList.tsx
   │  └─ layout/
   │     Header.tsx
   │     Footer.tsx
   ├─ hooks/
   │  useLocalStorage.ts
   │  useDiceRoll.ts
   ├─ utils/
   │  validation.ts
   │  storage.ts
   ├─ styles/
   │  globals.css
   └─ tests/
      components/
      hooks/
```

---

### 2. Component plan & data flow  

| Component | Core props / state | Notes |
|-----------|-------------------|-------|
| `<App>` | `state` (reducer), `dispatch` | Uses `useReducer` for complex state. Error boundary wrapper. |
| `<DiceRoller>` | `stat`, `onRoll`, `disabled` | Memoized roll function. Loading state. Error handling. |
| `<CheckboxTracker>` | `label`, `max`, `count`, `onChange`, `disabled` | ARIA labels. Keyboard navigation. |
| `<StringList>` | `items`, `onChange`, `validation` | Zod schema validation. Error messages. |
| `<TagList>` | `tags`, `onChange`, `maxTags` | Debounced input. Duplicate prevention. |

**Data flow:** Reducer pattern with TypeScript types. Local storage sync with error recovery.

---

### 3. Sample code snippets  

**Type-safe dice roller**  
```typescript
interface RollResult {
  dice: [number, number];
  total: number;
  timestamp: number;
}

export function useDiceRoll(statMod: number): () => RollResult {
  return useCallback(() => {
    const dice = [rollDie(), rollDie()] as [number, number];
    return {
      dice,
      total: dice.reduce((a, b) => a + b) + statMod,
      timestamp: Date.now()
    };
  }, [statMod]);
}
```

**Type-safe storage hook**  
```typescript
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema: z.ZodType<T>
): [T, (value: T) => void] {
  // Implementation with error handling and type safety
}
```

---

### 4. Next-step roadmap  

| Milestone | Deliverables |
|-----------|--------------|
| **Setup (1 day)** | TypeScript config, ESLint, Prettier, Husky, Vitest. CI pipeline. |
| **Core (2 days)** | Type-safe components, reducer state, validation. Unit tests. |
| **Polish (1 day)** | Error boundaries, loading states, animations. E2E tests. |
| **A11y (½ day)** | ARIA labels, keyboard nav, screen reader tests. |
| **Performance (½ day)** | Bundle analysis, code splitting, lazy loading. |
| **Deploy (1 hr)** | GitHub Actions for CI/CD. GitHub Pages setup. |
