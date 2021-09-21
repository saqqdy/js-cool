const fs = require('fs')
const path = require('path')
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const config = require('./config')

let fileList = []
const readDir = entry => {
    const dirInfo = fs.readdirSync(entry)
    dirInfo.forEach(item => {
        const name = path.join(entry, item)
        const info = fs.statSync(name)
        if (info.isDirectory()) {
            readDir(name)
        } else {
            ;/^[\S]*\.ts$/.test(item) && item !== 'index.ts' && getInfo(name)
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
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                banner: config.banner
            },
            {
                file: 'lib/index.esm.js',
                format: 'es',
                banner: config.banner
            }
        ],
        plugins: [
            resolve({ extensions: config.extensions }),
            commonjs(),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false
                    },
                    include: ['src/**/*'],
                    exclude: ['node_modules', '__tests__', 'core-js']
                },
                abortOnError: false
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: config.extensions,
                // exclude: [/\/core-js\//],
                // runtimeHelpers: true,
                sourceMap: true
            })
        ],
        external(id) {
            // return ['core-js', 'tslib'].some(k => new RegExp('^' + k).test(id))
            return ['core-js'].some(k => new RegExp('^' + k).test(id))
        }
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
                sourcemap: false,
                banner: config.banner
            }
        ],
        plugins: [
            resolve({ extensions: config.extensions }),
            commonjs(),
            typescript({
                tsconfigOverride: {
                    include: ['src/**/*'],
                    exclude: ['node_modules', '__tests__', 'core-js']
                },
                abortOnError: false
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: config.extensions,
                // exclude: [/\/core-js\//],
                // runtimeHelpers: true,
                sourceMap: true
            })
        ],
        external(id) {
            return ['core-js'].some(k => new RegExp('^' + k).test(id))
        }
    },
    // es module----------------------------------------------------
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'es/index.js',
                format: 'cjs',
                banner: config.banner
            },
            {
                file: 'es/index.esm.js',
                format: 'es',
                banner: config.banner
            }
        ],
        plugins: [
            resolve({ extensions: config.extensions }),
            commonjs(),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        target: 'es6'
                    },
                    include: ['src/**/*'],
                    exclude: ['node_modules', '__tests__', 'core-js']
                },
                abortOnError: false
            })
        ],
        external(id) {
            // return ['core-js', 'tslib'].some(k => new RegExp('^' + k).test(id))
            return ['core-js'].some(k => new RegExp('^' + k).test(id))
        }
    },
    {
        input: fileList,
        output: [
            {
                // file: 'lib/[name].js',
                dir: 'es',
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'auto',
                format: 'cjs',
                // format: 'iife', // immediately-invoked function expression — suitable for <script> tags
                sourcemap: false,
                banner: config.banner
            }
        ],
        plugins: [
            resolve({ extensions: config.extensions }),
            commonjs(),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        target: 'es6'
                    },
                    include: ['src/**/*'],
                    exclude: ['node_modules', '__tests__', 'core-js']
                },
                abortOnError: false
            })
        ],
        external(id) {
            return ['core-js'].some(k => new RegExp('^' + k).test(id))
        }
    }
]
