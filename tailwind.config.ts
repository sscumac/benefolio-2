import type { Config } from "tailwindcss";

module.exports = {
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        sm: "800px",
      },
      colors: {
        "normal-black": "#222222",
        "light-blue": "#017EB3",
        "soft-blue": "#ecf8fd",
        "bright-yellow": "#FFF200",
        "medium-green": "#42AE48",
        "darkish-pink": "#EC2B8B",
        kingblue: "#4169E1",
        goldenred: "#DAA520",
      },
    },
  },
};
