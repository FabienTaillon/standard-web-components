import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: ['src/modules/vscode-wc.js', 'src/modules/material-wc.js', 'src/modules/lightning-wc.js'],
  output: {
    dir: 'modules',
    format: 'es'
  },
  plugins: [nodeResolve()]
};