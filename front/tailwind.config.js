/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                custom: '-5px 5px 15px rgb(40,40,40)',
                customBig: '-10px 10px 20px rgb(40,40,40)',
            },
            gridTemplateColumns: {
                'auto-fit-minmax': 'repeat(auto-fit, minmax(260px, 320px))',
                'auto-fit-minmax2': 'repeat(auto-fit, minmax(260px, 350px))',
            },
            clipPath: {
                'polygonImage': 'polygon(0% 0%, 80% 0%, 80% 30%, 100% 50%, 80% 70%, 80% 100%, 0 100%)',
                'polygonImage2': 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)',
            },
            screens:{
                "x12": '1690px',
            },
            width: {
                'eventCard': '350px',
                'customWidth': '420px',
            },
            height: {
                'custom': '550px',
            },
        },
    },
    plugins: [
        require('tailwind-clip-path'),
    ],
};
