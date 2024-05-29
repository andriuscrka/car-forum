const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Development'),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};