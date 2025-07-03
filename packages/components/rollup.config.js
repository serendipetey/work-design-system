const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const postcss = require("rollup-plugin-postcss");

// Only generate source maps in production builds
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: isProduction, // Only in production
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: isProduction, // Only in production
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      exclude: ["**/*.test.*", "**/*.stories.*", "scripts/**/*"],
    }),
    postcss({
      extract: "styles.css",
      minimize: true,
    }),
  ],
  external: ["react", "react-dom"],
};
