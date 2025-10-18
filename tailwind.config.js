/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'blood-red': '#8B0000',
                'charcoal': '#36454F',
            },
            fontFamily: {
                'yataghan': ['"Yataghan-Regular"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
                'fontin': ['"Fontin-Regular"', 'Georgia', 'Garamond', '"Times New Roman"', 'Times', 'serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}; 