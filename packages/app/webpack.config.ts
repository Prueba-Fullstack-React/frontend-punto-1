const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  const dotenvFileName = '.env';

  return {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    resolve: {
      roots: [path.resolve('./src')],
      extensions: ['.tsx', '.ts', '.js', '.ttf', '.woff'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.bundle.js',
      publicPath: '/',
    },
    devServer: {
      static: path.join(__dirname, 'src/'),
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          enforce: 'pre',
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/assets/server_config', to: '' }],
      }),
      new Dotenv({
        path: dotenvFileName,
      }),
    ],
  };
};
