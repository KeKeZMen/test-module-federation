import path from "path";
import { Configuration as WebpackConfiguration, container } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import ReactRefreshTypescript from "react-refresh-typescript";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

export default () => {
  const config: Configuration = {
    mode: "development",

    entry: path.resolve("./src/index.tsx"),

    output: {
      path: path.resolve("public"),
      filename: "[name].[contenthash].js",
      clean: true,
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: [ReactRefreshTypescript()].filter(Boolean),
                }),
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.tsx$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve("./index.html"),
        minify: true,
      }),
      new container.ModuleFederationPlugin({
        filename: "remoteEntry.js",
        name: "header",
        exposes: {
          "./Header": "./src/render.tsx",
        },
        shared: {
          react: {
            eager: true,
            singleton: true,
          },
          "react-dom": {
            eager: true,
            singleton: true,
          },
        },
      }),
    ],

    devServer: {
      port: 3001,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
  };

  return config;
};
