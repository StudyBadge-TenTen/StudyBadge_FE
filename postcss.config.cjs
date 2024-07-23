module.exports = {
  plugins: {
    tailwindcss: { config: "./tailwind.config.js" },
    autoprefixer: {
      browsers: ["last 2 versions", "> 1%"],
    },
  },
};
