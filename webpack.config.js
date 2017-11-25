const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const distDir = path.join(__dirname, '/dist');

module.exports = [
  {
    entry: './src/index.jsx', // トランスパイル対象
    output: {
      path: distDir, // 出力先ディレクトリ
      filename: 'bundle.js', // 入力されたファイルをまとめて出力するときのファイル名
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader', // Babelをwebpackで利用できるようにする
          options: {
            presets: ['react', 'es2015'], // reactとes2015をトランスパイル対象とする
          },
        },
      ],
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'), // distディレクトリのファイルを確認する
      port: 3000, // 3000ポートを利用
    },
    resolve: {
      extensions: ['.js', '.jsx'], // jsファイル, jsxファイルを対象とする
    },
  },
  {
    entry: {
      style: './stylesheets/style.scss', // トランスパイル対象
    },
    output: {
      path: distDir, // 出力先ディレクトリ
      filename: '[name].css',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ],
  },
];
