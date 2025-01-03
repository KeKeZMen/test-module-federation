import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import { Configuration as WebpackConfiguration, container } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

export default () => {
  const config: Configuration = {
    mode: "development",

    entry: "./src/index.ts",

    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve("public"),
      clean: true,
    },

    resolve: {
      extensions: [".ts", ".js", ".vue", ".json"],
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
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: "asset/resource",
        },
      ],
    },

    devServer: {
      port: 3002,
      open: true,
      hot: true,
      historyApiFallback: true,
    },

    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve("./index.html"),
        minify: true,
      }),
      new container.ModuleFederationPlugin({
        filename: "remoteEntry.js",
        name: "footer",
        exposes: {
          "./Footer": "./src/render.ts",
        },
        shared: {
          vue: {
            eager: true,
            singleton: true,
          },
        },
      }),
    ],
  };

  return config;
};
