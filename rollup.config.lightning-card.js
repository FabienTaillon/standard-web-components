import lwc from "@lwc/rollup-plugin";
import replace from "@rollup/plugin-replace";

export default {
  input: [
    "src/modules/lightning-card-wc.js",
  ],
  output: {
    dir: 'modules/lightning/',
    format: "es",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true
    }),
    lwc({
      modules: [
        { npm: "@salesforce-ux/design-system" },
        { npm: "lightning-base-components" }
      ],
      disableSyntheticShadowSupport: true
    })
  ],
};