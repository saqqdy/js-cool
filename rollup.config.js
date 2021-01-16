const fs = require('fs')
const path = require('path')
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

let fileList = []
const readDir = entry => {
  const dirInfo = fs.readdirSync(entry)
  dirInfo.forEach(item => {
    const name = path.join(entry, item)
    const info = fs.statSync(name)
    if (info.isDirectory()) {
      readDir(name)
    } else {
      let fileName = name.split('/').reverse()
      ;/^[\S]*\.js$/.test(fileName[0]) && getInfo(name)
    }
  })
}
const getInfo = url => {
  fileList.push(url)
}
readDir('./src')

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'JSCOOL',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      babel({ babelHelpers: 'inline' }),
      production && terser()
    ],
    // external: ['core-js', '@babel/runtime']
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [babel({ babelHelpers: 'bundled' })],
    external: ['core-js']
  },
  {
    input: fileList,
    output: [
      {
        // file: 'lib/[name].js',
        dir: 'lib',
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'auto',
        format: 'cjs',
        // format: 'iife', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: false
      }
    ],
    plugins: [babel({ babelHelpers: 'bundled' })],
    external: ['core-js']
  }
]
