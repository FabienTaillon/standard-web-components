import lwc from "@lwc/rollup-plugin";
import replace from "@rollup/plugin-replace";

export default {
  input: [
    "src/lwc/index.js",
  ],
  output: {
    file: "modules/myButton.js",
    format: "esm",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    lwc({
      disableSyntheticShadowSupport: true
    }),
  ],
};