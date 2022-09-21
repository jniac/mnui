import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default [{
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'module'
  },
  plugins: [typescript({ sourceMap: true })]
}, {
  input: 'dist/types/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [dts()],
}]
