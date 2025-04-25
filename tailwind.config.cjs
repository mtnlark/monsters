/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'yataghan': ['"Yataghan-Regular"', 'serif'],
                'fontin': ['"Fontin-Regular"', 'serif'],
                'fontin-bold': ['"Fontin-Bold"', 'serif'],
                'fontin-italic': ['"Fontin-Italic"', 'serif'],
                'fontin-sc': ['"Fontin-SmallCaps"', 'serif'],
            },
            colors: {
                'blood-red': '#8B0000',
                'charcoal': '#36454F',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}; 