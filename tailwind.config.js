/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // This here will change the whole pages font
      sans: "Roboto Mono,monospace",
    },
    //Extend is used to define properties in addition to the ones in the tailwindcss such as colors
    extend: {
      height: {
        //This is for mobile devices compatibility is a more mordern approach to 100vh
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
