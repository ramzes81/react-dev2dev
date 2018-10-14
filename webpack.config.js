const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const exampleName = 'timer';
const exampleBaseFolder = path.join(__dirname, `examples/${exampleName}/`);

module.exports = {
  mode: 'development',
  entry: {
    bundle: ['babel-polyfill', `./examples/${exampleName}/app.jsx`],
  },
  output: {
    path: path.join(exampleBaseFolder, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(exampleBaseFolder, 'src'),
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
    open: true,
    https: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            includePaths: [
              './node_modules',
            ],
          },
        }],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `examples/${exampleName}/index.html`,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
