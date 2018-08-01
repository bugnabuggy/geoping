const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    publicPath: './',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve('./dist'),
    hot: true,
    inline: true,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      cutCode: JSON.stringify(true)
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    })
  ],
});