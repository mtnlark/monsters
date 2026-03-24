interface TextTrackerProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

/**
 * Text area for tracking strings or conditions.
 * Fully controlled component.
 */
export function TextTracker({ label, value, onChange }: TextTrackerProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="card h-full flex flex-col">
      <label className="component-label mb-3">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-h-[100px] sm:min-h-[120px] w-full px-3 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-button text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-red resize-none font-fontin text-sm"
        style={{
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
        placeholder={`Enter ${label.toLowerCase()}...`}
        aria-label={label}
      />
      {value && (
        <div className="flex justify-end mt-2">
          <button
            onClick={handleClear}
            className="btn-tertiary"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
