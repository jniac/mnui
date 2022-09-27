import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

export default [{
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'module',
  },
  plugins: [
    typescript(), 
    terser(),
  ],
}, {
  input: 'dist/types/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [dts()],
}]
