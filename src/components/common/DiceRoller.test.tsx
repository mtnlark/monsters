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

    // Should show stat buttons after rolling (new format: "Hot +1")
    expect(screen.getByRole('button', { name: /hot/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cold/i })).toBeInTheDocument();
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
    await user.click(screen.getByRole('button', { name: /hot/i }));

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
    expect(screen.getByRole('button', { name: /hot/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.queryByRole('button', { name: /hot/i })).not.toBeInTheDocument();
  });
});
