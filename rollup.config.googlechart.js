import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/modules/googlechart-wc.js',
  output: {
    file: 'modules/bundle-googlechart-wc.js',
    format: 'esm'
  },
  plugins: [nodeResolve()]
};