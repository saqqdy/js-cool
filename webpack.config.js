const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const config = require('./config')
let plugins = [new ProgressBarPlugin()]

module.exports = {
    mode: 'production',
    target: 'web',
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '/',
        filename: 'index.umd.js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'JSCOOL',
        umdNamedDefine: true,
        globalObject: "typeof self !== 'undefined' ? self : this"
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: config.alias,
        modules: ['node_modules']
    },
    externals: config.externals,
    performance: {
        hints: false
    },
    stats: {
        children: false
    },
    optimization: {
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: plugins
}
