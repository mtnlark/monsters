import { useCallback, useState } from 'react';
import { Stats } from '../../types/stats';

interface DiceRollerProps {
    stats: Stats;
    onRoll: (result: RollResult) => void;
    onNewRoll?: () => void;
    disabled?: boolean;
}

interface RollResult {
    dice: [number, number];
    total: number;
    stat: number;
    statName: string;
}

export function DiceRoller({ stats, onRoll, onNewRoll, disabled = false }: DiceRollerProps) {
    const [lastRoll, setLastRoll] = useState<[number, number] | null>(null);

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

    const applyStat = useCallback((statName: keyof Stats) => {
        if (!lastRoll) return;
        const stat = stats[statName];
        const total = lastRoll.reduce((a, b) => a + b) + stat;
        onRoll({ dice: lastRoll, total, stat, statName });
    }, [lastRoll, stats, onRoll]);

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
                        className="text-xl bg-gray-700 px-6 py-3 rounded-lg shadow-inner dice-result font-fontin"
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

interface DieVisualProps {
    value: number;
}

function DieVisual({ value }: DieVisualProps) {
    return (
        <div className="w-12 h-12 bg-red-900 rounded-lg shadow-inner flex items-center justify-center relative border-2 border-red-950">
            <span className="text-white text-2xl font-bold">{value}</span>
            <div className="absolute inset-0 bg-white/5 rounded-md"></div>
        </div>
    );
} 