const path = require('path'),
  webpack = require('webpack'),
  dirName = path.resolve('./');

function createConfig(isDebug, options = { banner: '' }) {
  let devTool = '',
    plugins = [];

  const appEntry = {
    kihon: ['./kihon.js']
  };

  if (isDebug) {
    devTool = 'eval-source-map';

    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        output: {
          beautify: true,
          comments: true
        },
        compress: {
          unused: false,
          drop_console: false,
          warnings: false
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    devTool = 'source-map';

    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: true,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          unused: true,
          drop_console: true,
          warnings: true
        }
      }),
      new webpack.BannerPlugin({
        banner: options.banner || '',
        raw: true
      })
    );
  }

  return {
    target: 'web',

    entry: appEntry,

    output: {
      path: path.resolve(dirName),
      filename: 'kihon.min.js',
      library: 'Kihon',
      libraryTarget: 'umd',
      libraryExport: 'default'
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ]
    },

    devtool: devTool,

    externals: {
      jquery: {
        commonjs: 'jquery',
        commonjs2: 'jquery',
        amd: 'jquery',
        root: 'jQuery'
      }
    },

    plugins: plugins,

    devServer: {
      contentBase: './examples/',
      noInfo: true,
      port: 9000,
      hot: true,
      inline: true
    }
  };
}

module.exports = createConfig;
