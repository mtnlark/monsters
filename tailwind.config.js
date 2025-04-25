/**
 * Tailwind CSS Configuration
 * 
 * This file configures:
 * - Content paths for Tailwind to scan
 * - Custom theme extensions
 * - Custom colors and fonts
 * - Required plugins
 */
/** @type {import('tailwindcss').Config} */
export default {
    // Files to scan for Tailwind classes
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    // Theme customization
    theme: {
        extend: {
            // Custom colors
            colors: {
                'blood-red': '#8B0000', // Deep red for blood theme
                'charcoal': '#36454F',  // Dark gray for UI elements
            },
        },
    },

    // Required plugins
    plugins: [
        require('@tailwindcss/forms'), // Adds better form element styling
    ],
}; 