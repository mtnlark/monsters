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
      <div className="grid grid-cols-2 gap-3">
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
