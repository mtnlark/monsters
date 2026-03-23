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

  const handleInputChange = (stat: keyof Stats, value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(Math.max(numValue, STAT_MIN), STAT_MAX);
    onStatChange({ ...stats, [stat]: clampedValue });
  };

  const getStatColor = (value: number): string => {
    if (value < 0) return 'text-red-400';
    if (value > 0) return 'text-green-400';
    return 'text-gray-900 dark:text-white';
  };

  const handleReset = () => {
    onStatChange({ hot: 0, cold: 0, dark: 0, volatile: 0 });
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
        {(Object.entries(stats) as [keyof Stats, number][]).map(([stat, value]) => (
          <div key={stat} className="flex flex-col items-center p-2 bg-gray-200 dark:bg-gray-700/30 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700/50 transition-colors stat-box">
            <label
              className="text-sm font-medium font-fontin text-gray-700 dark:text-gray-300 capitalize mb-1"
            >
              {stat}
            </label>
            <div className="relative w-[4.5rem]">
              <input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(stat, e.target.value)}
                className={`w-full px-1 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blood-red bg-white dark:bg-gray-800 ${getStatColor(value)} text-xl text-center font-bold transition-colors`}
                min={STAT_MIN}
                max={STAT_MAX}
                aria-label={`${stat} stat value`}
              />
              <div className="absolute inset-y-0 right-0 flex flex-col h-full">
                <button
                  onClick={() => updateStat(stat, 1)}
                  className="h-1/2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 border-l border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white w-5 rounded-tr-md flex items-center justify-center text-xs"
                  aria-label={`Increase ${stat}`}
                >
                  ▲
                </button>
                <button
                  onClick={() => updateStat(stat, -1)}
                  className="h-1/2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 border-l border-t border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white w-5 rounded-br-md flex items-center justify-center text-xs"
                  aria-label={`Decrease ${stat}`}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm self-end max-w-lg mx-auto w-full sm:w-auto"
      >
        Reset Stats
      </button>
    </div>
  );
}
