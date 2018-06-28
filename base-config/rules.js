exports.rules= [
  {
    test: /\.(htm|html)$/i,
    loader: 'html-withimg-loader'
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: "style-loader" // creates style nodes from JS strings
      },
      {
        loader: "css-loader" // translates CSS into CommonJS
      },
      {
        loader: "sass-loader" // compiles Sass to CSS
      }
    ]
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      'file-loader'
    ]
  },
  {
    test: /\.art$/,
    loader: "art-template-loader"
  }
];