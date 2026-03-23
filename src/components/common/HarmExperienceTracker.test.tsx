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

    const harmButtons = screen.getAllByLabelText(/harm level/i);
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
    await user.click(harmButtons[2]);

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
    await user.click(harmButtons[2]);

    expect(onHarmChange).toHaveBeenCalledWith(2);
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
    await user.click(expButtons[3]);

    expect(onExperienceChange).toHaveBeenCalledWith(4);
  });
});
