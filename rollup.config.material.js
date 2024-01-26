import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/modules/material-wc.js',
  output: {
    file: 'modules/bundle-material-wc.js',
    format: 'es'
  },
  plugins: [nodeResolve()]
};