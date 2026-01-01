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
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700/30 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-red resize-none font-fontin"
                    style={{ height: `${TEXT_AREA_HEIGHT}px` }}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleClear}
                        className="btn-clear"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}
 