const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry:   "./src/index-token.js",
  output: {
    filename: "index-token.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }
  ,{ from: "./src/index-token.html", to: "index-token.html" }
])],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
