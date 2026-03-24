import { useCallback, useState } from 'react';
import { Stats } from '../../types/stats';
import { DieVisual } from './DieVisual';

interface DiceRollerProps {
    stats: Stats;
    onRoll?: (result: RollResult) => void;
}

interface RollResult {
    dice: [number, number];
    total: number;
    stat: number;
    statName: string;
}

export function DiceRoller({ stats, onRoll }: DiceRollerProps) {
    const [lastRoll, setLastRoll] = useState<[number, number] | null>(null);
    const [rollKey, setRollKey] = useState(0);
    const [appliedResult, setAppliedResult] = useState<{ total: number; statName: string } | null>(null);

    const roll = useCallback(() => {
        const dice = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
        ] as [number, number];
        setLastRoll(dice);
        setAppliedResult(null);
        setRollKey(k => k + 1);
    }, []);

    const applyStat = useCallback((statName: keyof Stats) => {
        if (!lastRoll) return;
        const stat = stats[statName];
        const total = lastRoll.reduce((a, b) => a + b) + stat;
        setAppliedResult({ total, statName });
        onRoll?.({ dice: lastRoll, total, stat, statName });
    }, [lastRoll, stats, onRoll]);

    const clearRoll = useCallback(() => {
        setLastRoll(null);
        setAppliedResult(null);
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={roll}
                className="btn btn-primary w-full sm:w-auto px-8 py-3 text-lg font-fontin"
            >
                Roll 2d6
            </button>

            {lastRoll && (
                <>
                    <div className="flex items-center gap-3 py-2" key={rollKey}>
                        <DieVisual value={lastRoll[0]} animate />
                        <span className="text-2xl text-gray-400 dark:text-gray-500">+</span>
                        <DieVisual value={lastRoll[1]} animate />
                        <span className="text-2xl text-gray-400 dark:text-gray-500">=</span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white min-w-[2ch] text-center">
                            {lastRoll.reduce((a, b) => a + b)}
                        </span>
                    </div>

                    {appliedResult ? (
                        <div className={`text-center px-6 py-4 rounded-card border-2 ${
                            appliedResult.total >= 10
                                ? 'bg-green-900/20 border-green-600 dark:border-green-500'
                                : appliedResult.total <= 6
                                    ? 'bg-red-900/20 border-blood-red'
                                    : 'bg-gray-800/30 border-gray-600'
                        }`}>
                            <p className="text-sm font-fontin text-gray-600 dark:text-gray-300 mb-1">
                                with <span className="font-bold uppercase">{appliedResult.statName}</span>
                            </p>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                {appliedResult.total}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 w-full">
                            {(Object.keys(stats) as Array<keyof Stats>).map((statName) => (
                                <button
                                    key={statName}
                                    onClick={() => applyStat(statName)}
                                    className="btn btn-secondary text-sm py-3"
                                >
                                    <span className="capitalize">{statName}</span>
                                    <span className="ml-1 opacity-75">
                                        {stats[statName] >= 0 ? '+' : ''}{stats[statName]}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={clearRoll}
                        className="btn-tertiary"
                    >
                        Clear
                    </button>
                </>
            )}
        </div>
    );
}
