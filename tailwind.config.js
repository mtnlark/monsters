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
                'fontin-bold': ['"Fontin-Bold"', 'serif'],
                'fontin-italic': ['"Fontin-Italic"', 'serif'],
                'fontin-sc': ['"Fontin-SmallCaps"', 'serif'],
            },
            spacing: {
                '11': '2.75rem', // 44px - touch target
                '12': '3rem',    // 48px - large touch target
                '14': '3.5rem',  // 56px - dice size
            },
            borderRadius: {
                'card': '8px',
                'button': '6px',
                'small': '4px',
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
            },
            animation: {
                'tumble': 'tumble 300ms ease-out',
                'pulse-success': 'pulse-success 600ms ease-out',
                'pulse-danger': 'pulse-danger 600ms ease-out',
                'press': 'press 100ms ease-out',
            },
            keyframes: {
                tumble: {
                    '0%': { transform: 'rotate(-10deg) scale(0.8)', opacity: '0' },
                    '50%': { transform: 'rotate(5deg) scale(1.05)' },
                    '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
                },
                'pulse-success': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
                    '50%': { boxShadow: '0 0 20px 4px rgba(34, 197, 94, 0.4)' },
                },
                'pulse-danger': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 0, 0, 0)' },
                    '50%': { boxShadow: '0 0 20px 4px rgba(139, 0, 0, 0.4)' },
                },
                press: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.98)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
