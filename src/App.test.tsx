import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
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
