interface TextTrackerProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

const TEXT_AREA_HEIGHT = 120; // pixels - matches design spec

/**
 * Text area for tracking strings or conditions.
 * Fully controlled component.
 */
export function TextTracker({ label, value, onChange }: TextTrackerProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold font-fontin mb-3 text-center tracking-wide">
        {label}
      </h3>
      <div className="w-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700/30 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-red resize-none font-fontin"
          style={{ height: `${TEXT_AREA_HEIGHT}px` }}
          placeholder={`Enter ${label.toLowerCase()}...`}
          aria-label={label}
        />
        <button
          onClick={handleClear}
          className="mt-2 px-4 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm float-right"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
