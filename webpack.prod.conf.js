const path = require('path')

module.exports = (env, argv) => {
  return {
    entry: {
      index: './src/index'
    },
    output: {
      path: path.resolve(__dirname, ''),
      filename: '[name].min.js',
      // publicPath: '/assets/',
      // library: 'MyLibrary',
      libraryTarget: 'umd'
    },
    // mode: 'development',
    mode: 'production',
    // mode: 'none',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              // presets: ['@babel/preset-env'],
              presets: [
                [
                  '@babel/env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: "> 0.5%, not dead"
                  }
                ]
              ],
              comments: false
            }
          }
        }
      ]
    }
  }
}
