import { useState, useEffect } from 'react';

/**
 * Props for TextTracker component
 * @interface TextTrackerProps
 * @property {string} label - Label to display above text area
 * @property {string} [initialText=''] - Initial text value
 * @property {(text: string) => void} onTextChange - Callback when text changes
 */
interface TextTrackerProps {
    label: string;
    initialText?: string;
    onTextChange: (text: string) => void;
}

/**
 * Default text area height in pixels
 */
const TEXT_AREA_HEIGHT = 120;

/**
 * A reusable component for tracking and editing text content
 * Features:
 * - Text area with custom styling
 * - Clear button functionality
 * - Automatic state management
 * - Fontin font family integration
 * - Placeholder text based on label
 */
export function TextTracker({ label, initialText = '', onTextChange }: TextTrackerProps) {
    const [text, setText] = useState(initialText);

    // Update internal state when initialText prop changes
    useEffect(() => {
        if (initialText !== undefined) {
            setText(initialText);
        }
    }, [initialText]);

    /**
     * Handles text changes in textarea
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        onTextChange(newText);
    };

    /**
     * Clears text content
     */
    const handleClear = () => {
        setText('');
        onTextChange('');
    };

    return (
        <div className="flex flex-col">
            <h3
                className="text-xl font-semibold font-fontin mb-3 text-center tracking-wide"
                style={{ fontFamily: '"Fontin-Regular", serif' }}
            >
                {label}
            </h3>
            <div className="w-full">
                <textarea
                    value={text}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-red resize-none"
                    style={{
                        fontFamily: '"Fontin-Regular", serif',
                        height: `${TEXT_AREA_HEIGHT}px`
                    }}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
                <button
                    onClick={handleClear}
                    className="mt-2 px-4 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors text-sm float-right"
                >
                    Clear
                </button>
            </div>
        </div>
    );
} 