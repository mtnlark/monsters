import { useState, useEffect } from 'react';

/**
 * Represents character's Hot, Cold, Dark, and Volatile stats
 * @interface Stats
 * @property {number} hot - Character's Hot stat
 * @property {number} cold - Character's Cold stat
 * @property {number} dark - Character's Dark stat
 * @property {number} volatile - Character's Volatile stat
 */
interface Stats {
    hot: number;
    cold: number;
    dark: number;
    volatile: number;
}

/**
 * Props for StatTracker component
 * @interface StatTrackerProps
 * @property {(stats: Stats) => void} onStatChange - Callback when stats change
 * @property {Stats} [initialStats] - Optional initial stats
 */
interface StatTrackerProps {
    onStatChange: (stats: Stats) => void;
    initialStats?: Stats;
}

/**
 * Default stats used when no initial stats are provided
 */
const DEFAULT_STATS: Stats = {
    hot: 0,
    cold: 0,
    dark: 0,
    volatile: 0,
};

/**
 * A component for tracking and modifying character stats
 * Features:
 * - Visual stat display
 * - Increment/decrement buttons
 * - Direct number input
 * - Stat range validation (-3 to 3)
 */
export function StatTracker({ onStatChange, initialStats }: StatTrackerProps) {
    const [stats, setStats] = useState<Stats>(initialStats || DEFAULT_STATS);

    // Update local state when props change
    useEffect(() => {
        if (initialStats) {
            setStats(initialStats);
        }
    }, [initialStats]);

    /**
     * Updates a specific stat value
     * @param {keyof Stats} stat - Stat to update
     * @param {number} value - New value
     */
    const updateStat = (stat: keyof Stats, value: number) => {
        const newStats = { ...stats, [stat]: value };
        setStats(newStats);
        onStatChange(newStats);
    };

    /**
     * Gets the color class for a stat value
     * @param {number} value - Stat value
     * @returns {string} Tailwind color class
     */
    const getStatColor = (value: number): string => {
        if (value < 0) return 'text-red-400';
        if (value > 0) return 'text-green-400';
        return 'text-white';
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
            {Object.entries(stats).map(([stat, value]) => (
                <div key={stat} className="flex flex-col items-center p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors stat-box">
                    <label
                        className="text-sm font-medium font-fontin text-gray-300 capitalize mb-1"
                    >
                        {stat}
                    </label>
                    <div className="relative w-[4.5rem]">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => updateStat(stat as keyof Stats, parseInt(e.target.value) || 0)}
                            className={`w-full px-1 py-1.5 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blood-red bg-gray-800 ${getStatColor(value)} text-xl text-center font-bold transition-colors`}
                            min="-3"
                            max="3"
                        />
                        <div className="absolute inset-y-0 right-0 flex flex-col h-full">
                            <button
                                onClick={() => updateStat(stat as keyof Stats, Math.min(value + 1, 3))}
                                className="h-1/2 bg-gray-700 hover:bg-gray-600 border-l border-gray-600 text-white w-5 rounded-tr-md flex items-center justify-center text-xs"
                            >
                                ▲
                            </button>
                            <button
                                onClick={() => updateStat(stat as keyof Stats, Math.max(value - 1, -3))}
                                className="h-1/2 bg-gray-700 hover:bg-gray-600 border-l border-t border-gray-600 text-white w-5 rounded-br-md flex items-center justify-center text-xs"
                            >
                                ▼
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 