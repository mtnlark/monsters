import { useState, useEffect } from 'react';

interface TextTrackerProps {
    label: string;
    initialText?: string;
    onTextChange: (text: string) => void;
}

const TEXT_AREA_HEIGHT = 120;

export function TextTracker({ label, initialText = '', onTextChange }: TextTrackerProps) {
    const [text, setText] = useState(initialText);

    useEffect(() => {
        if (initialText !== undefined) {
            setText(initialText);
        }
    }, [initialText]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        onTextChange(newText);
    };

    const handleClear = () => {
        setText('');
        onTextChange('');
    };

    return (
        <div className="flex flex-col">
            <h3
                className="text-xl font-semibold font-fontin mb-3 text-center tracking-wide"
            >
                {label}
            </h3>
            <div className="w-full">
                <textarea
                    value={text}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-red resize-none font-fontin"
                    style={{ height: `${TEXT_AREA_HEIGHT}px` }}
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