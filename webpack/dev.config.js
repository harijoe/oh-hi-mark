const path = require('path');
const webpack = require('webpack');

const host = 'localhost';
const port = 3000;
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';

const baseDevConfig = () => ({
  devtool: 'eval-cheap-module-source-map',
  entry: {
    background: [hotScript, path.join(__dirname, '../chrome/extension/background')],
    manager: [hotScript, path.join(__dirname, '../chrome/extension/manager')],
    popup: [hotScript, path.join(__dirname, '../chrome/extension/popup')],
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true,
      errorDetails: true
    },
    noInfo: true
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr'
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
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
      exclude: /node_modules/,
      query: {
        presets: ['react-hmre']
      }
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
});

const injectPageConfig = baseDevConfig();
injectPageConfig.entry = {
  'inject-extraction': path.join(__dirname, '../chrome/extension/inject-extraction'),
  'inject-toastr': path.join(__dirname, '../chrome/extension/inject-toastr'),
};
delete injectPageConfig.hotMiddleware;
delete injectPageConfig.module.loaders[0].query;
injectPageConfig.plugins.shift(); // remove HotModuleReplacementPlugin
injectPageConfig.output = {
  path: path.join(__dirname, '../dev/js'),
  filename: '[name].bundle.js',
};
const appConfig = baseDevConfig();

module.exports = [
  appConfig,
  injectPageConfig
];
