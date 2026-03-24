import { useState, useEffect } from 'react';

interface HarmExperienceProps {
  harm: number;
  experience: number;
  onHarmChange: (harm: number) => void;
  onExperienceChange: (experience: number) => void;
}

const HARM_MAX = 4;
const EXPERIENCE_MAX = 5;

/**
 * Tracker for harm (damage) and experience points.
 * Clicking a filled level decrements; clicking unfilled sets to that level.
 */
export function HarmExperienceTracker({
  harm,
  experience,
  onHarmChange,
  onExperienceChange,
}: HarmExperienceProps) {
  const [animatingHarm, setAnimatingHarm] = useState<number | null>(null);
  const [animatingXP, setAnimatingXP] = useState<number | null>(null);

  const handleHarmClick = (level: number) => {
    if (level === harm) {
      onHarmChange(harm - 1);
    } else {
      setAnimatingHarm(level);
      onHarmChange(level);
    }
  };

  const handleExperienceClick = (level: number) => {
    if (level === experience) {
      onExperienceChange(experience - 1);
    } else {
      setAnimatingXP(level);
      onExperienceChange(level);
    }
  };

  useEffect(() => {
    if (animatingHarm !== null) {
      const timer = setTimeout(() => setAnimatingHarm(null), 300);
      return () => clearTimeout(timer);
    }
  }, [animatingHarm]);

  useEffect(() => {
    if (animatingXP !== null) {
      const timer = setTimeout(() => setAnimatingXP(null), 300);
      return () => clearTimeout(timer);
    }
  }, [animatingXP]);

  const clearHarm = () => onHarmChange(0);
  const clearExperience = () => onExperienceChange(0);

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-8">
      {/* Harm Tracker */}
      <div className="flex flex-col items-center">
        <label className="component-label mb-3">Harm</label>
        <div className={`flex items-center gap-2 ${harm >= HARM_MAX ? 'animate-pulse-danger' : ''}`}>
          {[...Array(HARM_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= harm;
            const isAnimating = animatingHarm === level;
            return (
              <button
                key={index}
                className={`w-12 h-12 rounded-small flex items-center justify-center transition-all duration-150 font-bold text-lg ${
                  isFilled
                    ? 'bg-gradient-to-br from-blood-red to-red-900 text-white shadow-md border border-red-900'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                } ${isAnimating ? 'scale-110' : ''}`}
                onClick={() => handleHarmClick(level)}
                aria-label={`Harm level ${level}`}
                aria-pressed={isFilled}
              >
                {isFilled ? '✕' : level}
              </button>
            );
          })}
        </div>
        <button className="btn-tertiary mt-2" onClick={clearHarm}>
          Clear
        </button>
      </div>

      {/* Experience Tracker */}
      <div className="flex flex-col items-center">
        <label className="component-label mb-3">Experience</label>
        <div className={`flex items-center gap-2 ${experience >= EXPERIENCE_MAX ? 'animate-pulse-success' : ''}`}>
          {[...Array(EXPERIENCE_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= experience;
            const isAnimating = animatingXP === level;
            return (
              <button
                key={index}
                className={`w-12 h-12 rounded-small flex items-center justify-center transition-all duration-150 font-bold text-lg ${
                  isFilled
                    ? 'bg-gradient-to-br from-green-600 to-green-800 text-white shadow-md border border-green-800'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                } ${isAnimating ? 'scale-110' : ''}`}
                onClick={() => handleExperienceClick(level)}
                aria-label={`Experience level ${level}`}
                aria-pressed={isFilled}
              >
                {isFilled ? '★' : level}
              </button>
            );
          })}
        </div>
        <button className="btn-tertiary mt-2" onClick={clearExperience}>
          Clear
        </button>
      </div>
    </div>
  );
}
