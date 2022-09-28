import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import { terser } from "rollup-plugin-terser"

export default [
  {
    input: "src/index.ts",
    output: {
      file: 'dist/output/mnui.js'
    },
    plugins: [
      typescript({ target: "ES2022", declarationDir: 'dist/mdr' }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/mnui.es2015.min.js",
      format: "module",
    },
    plugins: [
      typescript({ target: "ES2015", declaration: false }),
      terser(),
    ],
  },
  {
    input: "dist/output/index.d.ts",
    output: { 
      file: "dist/mnui.d.ts", 
      format: "es" 
    },
    plugins: [dts()],
  },
]
