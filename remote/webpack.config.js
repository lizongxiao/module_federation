const path = require("path");
const { VueLoaderPlugin } = require("vue-loader"); 

const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    publicPath: "auto",
  },
  devServer: {
    port: 8081,
    hot: true,
  },
  resolve: {
    alias: {
      vue: path.resolve(__dirname, "node_modules/vue"),
    },
    extensions: [".vue", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./HelloWorld": "./src/components/HelloWorld.vue",
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: "^3.0.0",
          eager: false, 
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
