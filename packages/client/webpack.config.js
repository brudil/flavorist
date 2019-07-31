const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
module.exports = {
    entry: {
        main: ['./src/app.ts'],
      },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
       title: 'Flavorist',
       template: 'src/app.html'
     }),
     new HtmlWebpackHarddiskPlugin(),
     new WorkboxPlugin.GenerateSW({
       clientsClaim: true,
       skipWaiting: true
     })
  ],
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader?useBabel=true&useCache=true',
            options: {
              useBabel: true,
              useCache: true,
              babelCore: "@babel/core",
              reportFiles: ['src/**/*.{ts,tsx}'],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ]
    },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.svg'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8008,
    historyApiFallback: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8000'
      },
    }
  }
};
