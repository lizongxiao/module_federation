const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
    extensions: [".js", ".vue", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remoteApp: "remoteApp@http://localhost:8081/remoteEntry.js",
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: "^3.0.0",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    hot: true,
    port: 8080,
  },
};
