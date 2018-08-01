const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: 'web',
  output: {
    path: path.resolve(`${__dirname}/dist`),
  },
  watch: true,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {test: /\.(tsx|ts)?$/, include: path.join(__dirname, 'src'), use: 'awesome-typescript-loader'},
      { test: /\.(jsx|js)?$/, include: path.join(__dirname, 'src'), use: 'babel-loader' },
      { test: /(\.css)$/, use: 'css-loader'},
    ],
  },
};