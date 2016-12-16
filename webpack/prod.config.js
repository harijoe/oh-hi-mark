const path = require('path');
const webpack = require('webpack');

module.exports = [{
  entry: {
    background: [path.join(__dirname, '../chrome/extension/background')],
    manager: [path.join(__dirname, '../chrome/extension/manager')],
    popup: [path.join(__dirname, '../chrome/extension/popup')],
    'inject-extraction': [path.join(__dirname, '../chrome/extension/inject-extraction')],
    'inject-toastr': [path.join(__dirname, '../chrome/extension/inject-toastr')],
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss'
      ]
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  node: {
    fs: 'empty'
  }
}, {
  entry: {
    segment: [path.join(__dirname, '../chrome/extension/segment')],
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'script-loader',
    }],
  },
}];
