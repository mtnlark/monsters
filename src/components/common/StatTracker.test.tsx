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
    await user.click(incrementButtons[0]);

    expect(onStatChange).toHaveBeenCalledWith({ ...defaultStats, hot: 1 });
  });

  it('respects max stat value of 3', async () => {
    const user = userEvent.setup();
    const onStatChange = vi.fn();
    const stats = { hot: 3, cold: 0, dark: 0, volatile: 0 };
    render(<StatTracker stats={stats} onStatChange={onStatChange} />);

    const incrementButtons = screen.getAllByLabelText(/increase/i);
    await user.click(incrementButtons[0]);

    expect(onStatChange).toHaveBeenCalledWith(stats);
  });

  it('respects min stat value of -3', async () => {
    const user = userEvent.setup();
    const onStatChange = vi.fn();
    const stats = { hot: -3, cold: 0, dark: 0, volatile: 0 };
    render(<StatTracker stats={stats} onStatChange={onStatChange} />);

    const decrementButtons = screen.getAllByLabelText(/decrease/i);
    await user.click(decrementButtons[0]);

    expect(onStatChange).toHaveBeenCalledWith(stats);
  });
});
