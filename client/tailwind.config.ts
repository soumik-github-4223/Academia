import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
        fontFamily:{
            Poppins:["var(--font-Poppins)"],
            Josefin:["var(--font-Josefin)"],
        },
        
        backgroundImage:{ // default background image
            'gradient-radial':'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            
        },
        screens:{ //custom screen size
            "1000px": "1000px", 
            "1100px": "1100px", 
            "1200px": "1200px", 
            "1300px": "1300px", 
            "1500px": "1500px", 
            "800px": "800px", 
            "400px": "400px", 
        }
    },
  },
  plugins: [],
}

export default config