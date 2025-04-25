import { useCallback, useState } from 'react';

/**
 * Represents character's Hot, Cold, Dark, and Volatile stats
 * @interface Stats
 * @property {number} hot - Character's Hot stat
 * @property {number} cold - Character's Cold stat
 * @property {number} dark - Character's Dark stat
 * @property {number} volatile - Caracter's Volatile stat
 */
interface Stats {
    hot: number;
    cold: number;
    dark: number;
    volatile: number;
}

/**
 * Props for DiceRoller component
 * @interface DiceRollerProps
 * @property {Stats} stats - Character's current stats
 * @property {(result: RollResult) => void} onRoll - Callback when a roll is made
 * @property {() => void} [onNewRoll] - Optional callback when a new roll is started
 * @property {boolean} [disabled] - Whether roller is disabled
 */
interface DiceRollerProps {
    stats: Stats;
    onRoll: (result: RollResult) => void;
    onNewRoll?: () => void;
    disabled?: boolean;
}

/**
 * Represents result of a dice roll
 * @interface RollResult
 * @property {[number, number]} dice - Individual dice values
 * @property {number} total - Total roll value including chosen stat
 * @property {number} stat - Stat value used
 * @property {string} statName - Name of stat used
 */
interface RollResult {
    dice: [number, number];
    total: number;
    stat: number;
    statName: string;
}

/**
 * A component for rolling 2d6 and applying character stats
 * Features:
 * - Visual dice rolling
 * - Stat application
 * - Roll history
 * - Disabled state support
 */
export function DiceRoller({ stats, onRoll, onNewRoll, disabled = false }: DiceRollerProps) {
    const [lastRoll, setLastRoll] = useState<[number, number] | null>(null);

    /**
     * Rolls two six-sided dice
     */
    const roll = useCallback(() => {
        if (onNewRoll) {
            onNewRoll();
        }

        const dice = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
        ] as [number, number];
        setLastRoll(dice);
    }, [onNewRoll]);

    /**
     * Applies a chosen stat to current roll
     * @param {keyof Stats} statName - Name of stat to apply
     */
    const applyStat = useCallback((statName: keyof Stats) => {
        if (!lastRoll) return;
        const stat = stats[statName];
        const total = lastRoll.reduce((a, b) => a + b) + stat;
        onRoll({ dice: lastRoll, total, stat, statName });
    }, [lastRoll, stats, onRoll]);

    /**
     * Clears current roll
     */
    const clearRoll = useCallback(() => {
        setLastRoll(null);
        if (onNewRoll) {
            onNewRoll();
        }
    }, [onNewRoll]);

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4 items-center">
                <button
                    onClick={roll}
                    disabled={disabled}
                    className="btn btn-primary font-fontin disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg transition-all hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
                    style={{ fontFamily: '"Fontin-Regular", serif' }}
                >
                    Roll 2d6
                </button>
                {lastRoll && (
                    <button
                        onClick={clearRoll}
                        className="px-4 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                        Clear
                    </button>
                )}
            </div>

            {lastRoll && (
                <>
                    <div
                        className="text-xl bg-gray-700 px-6 py-3 rounded-lg shadow-inner dice-result"
                        style={{ fontFamily: '"Fontin-Regular", serif' }}
                    >
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center">
                                <DieVisual value={lastRoll[0]} />
                                <span className="mx-2 text-gray-300">+</span>
                                <DieVisual value={lastRoll[1]} />
                                <span className="mx-2 text-gray-300">=</span>
                                <span className="font-bold text-white text-2xl">{lastRoll.reduce((a, b) => a + b)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center mt-2">
                        {Object.keys(stats).map((statName) => (
                            <button
                                key={statName}
                                onClick={() => applyStat(statName as keyof Stats)}
                                className="btn btn-secondary font-fontin py-2 px-5 transition-all hover:shadow-md"
                                style={{ fontFamily: '"Fontin-Regular", serif' }}
                                disabled={disabled}
                            >
                                With <span className="font-bold capitalize">{statName}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

/**
 * Props for DieVisual component
 * @interface DieVisualProps
 * @property {number} value - Value to display on die
 */
interface DieVisualProps {
    value: number;
}

/**
 * A visual representation of a six-sided die
 * @param {DieVisualProps} props - Component props
 */
function DieVisual({ value }: DieVisualProps) {
    return (
        <div className="w-12 h-12 bg-red-900 rounded-lg shadow-inner flex items-center justify-center relative border-2 border-red-950">
            <span className="text-white text-2xl font-bold">{value}</span>
            {/* maybe add dice pips/dots visualization later? */}
            <div className="absolute inset-0 bg-white/5 rounded-md"></div>
        </div>
    );
} 