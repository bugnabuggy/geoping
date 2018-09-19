const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const getClientEnvironment = require('./config/env');

const env = getClientEnvironment();
module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index')
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  watch: true,
  devServer: {
    contentBase: './dist',
    inline: false,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(env.stringified)
  ]
});