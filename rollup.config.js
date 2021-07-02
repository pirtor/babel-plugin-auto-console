import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/index.cjs.js",
      format: "cjs",
      exports: "default",
    },
    {
      file: "lib/index.ems.js",
      format: "es",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
  ],
  external: ["@babel/core"],
};
