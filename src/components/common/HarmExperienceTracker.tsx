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
  const handleHarmClick = (level: number) => {
    if (level === harm) {
      onHarmChange(harm - 1);
    } else {
      onHarmChange(level);
    }
  };

  const handleExperienceClick = (level: number) => {
    if (level === experience) {
      onExperienceChange(experience - 1);
    } else {
      onExperienceChange(level);
    }
  };

  const clearHarm = () => onHarmChange(0);
  const clearExperience = () => onExperienceChange(0);

  return (
    <div className="flex flex-row justify-center gap-12 flex-wrap">
      {/* Harm Tracker */}
      <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700/30 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700/40 transition-colors">
        <label className="text-xl font-medium font-fontin text-gray-700 dark:text-gray-300 mb-2">
          Harm
        </label>
        <div className="flex items-center gap-1">
          {[...Array(HARM_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= harm;
            return (
              <button
                key={index}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  isFilled
                    ? 'bg-blood-red text-white'
                    : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-500 hover:bg-gray-400 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleHarmClick(level)}
                aria-label={`Harm level ${level}`}
                aria-pressed={isFilled}
              >
                {level}
              </button>
            );
          })}
        </div>
        <button
          className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={clearHarm}
        >
          Clear
        </button>
      </div>

      {/* Experience Tracker */}
      <div className="flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-700/30 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700/40 transition-colors">
        <label className="text-xl font-medium font-fontin text-gray-700 dark:text-gray-300 mb-2">
          Experience
        </label>
        <div className="flex items-center gap-1">
          {[...Array(EXPERIENCE_MAX)].map((_, index) => {
            const level = index + 1;
            const isFilled = level <= experience;
            return (
              <button
                key={index}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  isFilled
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-500 hover:bg-gray-400 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleExperienceClick(level)}
                aria-label={`Experience level ${level}`}
                aria-pressed={isFilled}
              >
                {level}
              </button>
            );
          })}
        </div>
        <button
          className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={clearExperience}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
