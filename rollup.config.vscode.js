import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/modules/vscode-wc.js',
  output: {
    file: 'modules/bundle-vscode-wc.js',
    format: 'es'
  },
  plugins: [nodeResolve()]
};