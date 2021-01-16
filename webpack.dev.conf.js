const path = require('path')
const merge = require('webpack-merge')

// var TARGET = process.env.npm_lifecycle_event

// var common = {
//   entry: path.join(__dirname, 'app'),
//   module: {
//     loaders: [
//       {
//         test: /\.css$/,
//         loaders: ['style', 'css']
//       }
//     ]
//   }
// }

// if (TARGET === 'start') {
//   module.exports = merge(common, {
//     module: {
//       loaders: [
//         {
//           test: /\.jsx?$/,
//           loader: 'babel?stage=1',
//           include: path.join(ROOT_PATH, 'app')
//         }
//       ]
//     }
//   })
// }

// if (TARGET === 'build') {
// }

// module.exports = {
//   entry: {
//     index: './src/index'
//     // index1: './src/index1'
//   },
//   output: {
//     path: path.resolve(__dirname, 'lib'),
//     filename: '[name].js'
//     // publicPath: '/assets/',
//     // library: 'MyLibrary',
//     // libraryTarget: 'umd'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   }
// }
module.exports = (env, argv) => {
  return {
    entry: {
      index: './src/index'
    },
    output: {
      path: path.resolve(__dirname, ''),
      filename: '[name].js',
      // publicPath: '/assets/',
      // library: 'MyLibrary',
      libraryTarget: 'umd'
    },
    mode: 'development',
    // mode: 'production',
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
