import { useState, useEffect, useCallback, useRef } from 'react';
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

  const isResetting = useRef(false);

  useEffect(() => {
    if (isResetting.current) {
      localStorage.removeItem(STORAGE_KEY);
      isResetting.current = false;
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    }
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
    isResetting.current = true;
    setCharacter(DEFAULT_CHARACTER);
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
