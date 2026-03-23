import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCharacter, CharacterData } from './useCharacter';

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
});
