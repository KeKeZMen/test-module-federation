import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";

export default {
  entry: path.resolve("./src/index.ts"),

  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      vue: "@vue/runtime-dom",
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve("./index.html"),
      minify: true,
    }),
  ],
} as Configuration;
