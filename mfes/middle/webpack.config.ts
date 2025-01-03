import { Configuration as WebpackConfiguration } from "webpack";
import { container } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

export default () => {
  const config: Configuration = {
    mode: "development",

    entry: path.resolve("./src/index.ts"),

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
          test: /\.ts?$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve("./index.html"),
        minify: true,
      }),
      new container.ModuleFederationPlugin({
        remotes: {
          header: "header@http://localhost:3001/remoteEntry.js",
          footer: "footer@http://localhost:3002/remoteEntry.js",
        },
      }),
    ],

    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
  };

  return config;
};
