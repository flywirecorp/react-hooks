import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const GLOBALS = {
  'lodash.isequal': 'isEqual',
  react: 'React',
  'react-dom': 'ReactDOM',
  'validate.js': 'Validate.js',
  xregexp: 'XRegExp',
};

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      globals: GLOBALS,
    },
    {
      file: pkg.module,
      format: 'es',
      globals: GLOBALS,
    },
  ],
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
  external: ['lodash.isequal', 'react', 'react-dom', 'validate.js', 'xregexp'],
};
