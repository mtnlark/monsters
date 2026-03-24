import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatTracker } from './StatTracker';

describe('StatTracker', () => {
  const defaultStats = { hot: 0, cold: 0, dark: 0, volatile: 0 };

  it('displays current stat values', () => {
    const stats = { hot: 2, cold: -1, dark: 0, volatile: 1 };
    render(<StatTracker stats={stats} onStatChange={() => {}} />);

    // Values display with +/- formatting in spans
    expect(screen.getByLabelText('hot stat value')).toHaveTextContent('+2');
    expect(screen.getByLabelText('cold stat value')).toHaveTextContent('-1');
    expect(screen.getByLabelText('dark stat value')).toHaveTextContent('+0');
    expect(screen.getByLabelText('volatile stat value')).toHaveTextContent('+1');
  });

  it('calls onStatChange when increment button is clicked', async () => {
    const user = userEvent.setup();
    const onStatChange = vi.fn();
    render(<StatTracker stats={defaultStats} onStatChange={onStatChange} />);

    const incrementButtons = screen.getAllByLabelText(/increase/i);
    await user.click(incrementButtons[0]);

    expect(onStatChange).toHaveBeenCalledWith({ ...defaultStats, hot: 1 });
  });

  it('disables increment button at max stat value of 3', () => {
    const stats = { hot: 3, cold: 0, dark: 0, volatile: 0 };
    render(<StatTracker stats={stats} onStatChange={() => {}} />);

    const incrementHotButton = screen.getByLabelText('Increase hot');
    expect(incrementHotButton).toBeDisabled();
  });

  it('disables decrement button at min stat value of -3', () => {
    const stats = { hot: -3, cold: 0, dark: 0, volatile: 0 };
    render(<StatTracker stats={stats} onStatChange={() => {}} />);

    const decrementHotButton = screen.getByLabelText('Decrease hot');
    expect(decrementHotButton).toBeDisabled();
  });
});
