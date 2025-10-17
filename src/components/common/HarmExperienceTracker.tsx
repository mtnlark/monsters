import { useState, useEffect } from 'react'

/**
 * Props for HarmExperienceTracker component
 * @interface HarmExperienceProps
 * @property {number} [initialHarm=0] - Initial harm value (0-4)
 * @property {number} [initialExperience=0] - Initial experience value (0-5)
 * @property {(harm: number) => void} onHarmChange - Callback when harm changes
 * @property {(experience: number) => void} onExperienceChange - Callback when experience changes
 */
interface HarmExperienceProps {
    initialHarm?: number;
    initialExperience?: number;
    onHarmChange: (harm: number) => void;
    onExperienceChange: (experience: number) => void;
}

/**
 * Constants for harm and experience tracking
 */
const HARM_MAX = 4;
const EXPERIENCE_MAX = 5;

/**
 * A component for tracking character harm and experience
 * Features:
 * - Visual harm tracking (0-4)
 * - Visual experience tracking (0-5)
 * - Clear buttons for both trackers
 * - Automatic value clamping
 */
export function HarmExperienceTracker({
    initialHarm = 0,
    initialExperience = 0,
    onHarmChange,
    onExperienceChange
}: HarmExperienceProps) {
    const [harm, setHarm] = useState<number>(initialHarm);
    const [experience, setExperience] = useState<number>(initialExperience);

    // Update local state when props change
    useEffect(() => {
        setHarm(initialHarm);
    }, [initialHarm]);

    useEffect(() => {
        setExperience(initialExperience);
    }, [initialExperience]);

    /**
     * Updates harm value with proper clamping
     * @param {number} newHarm - New harm value
     */
    const updateHarm = (newHarm: number) => {
        const clampedHarm = Math.min(Math.max(newHarm, 0), HARM_MAX);
        setHarm(clampedHarm);
        onHarmChange(clampedHarm);
    };

    /**
     * Updates experience value with proper clamping
     * @param {number} newExperience - New experience value
     */
    const updateExperience = (newExperience: number) => {
        const clampedExperience = Math.min(Math.max(newExperience, 0), EXPERIENCE_MAX);
        setExperience(clampedExperience);
        onExperienceChange(clampedExperience);
    };

    return (
        <div className="flex flex-row justify-center gap-12 flex-wrap">
            {/* Harm Tracker */}
            <div className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-colors">
                <label
                    className="text-xl font-medium font-fontin text-gray-300 mb-2"
                >
                    Harm
                </label>
                <div className="flex items-center gap-1">
                    {[...Array(HARM_MAX)].map((_, index) => (
                        <button
                            key={index}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${index < harm
                                ? 'bg-blood-red text-white'
                                : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                                }`}
                            onClick={() => updateHarm(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => updateHarm(0)}
                >
                    Clear
                </button>
            </div>

            {/* Experience Tracker */}
            <div className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-colors">
                <label
                    className="text-xl font-medium font-fontin text-gray-300 mb-2"
                >
                    Experience
                </label>
                <div className="flex items-center gap-1">
                    {[...Array(EXPERIENCE_MAX)].map((_, index) => (
                        <button
                            key={index}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${index < experience
                                ? 'bg-green-700 text-white'
                                : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                                }`}
                            onClick={() => updateExperience(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => updateExperience(0)}
                >
                    Clear
                </button>
            </div>
        </div>
    );
} 