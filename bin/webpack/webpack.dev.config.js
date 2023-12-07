const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./example/main.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    port: process.env.PORT || 8101
  }
};
