const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getClientEnvironment = require('./config/env');

const env = getClientEnvironment();
module.exports = merge(common, {
  devtool: 'hidden-source-map',
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    publicPath: './',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(env.stringified['process.env']),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    })
  ],
});