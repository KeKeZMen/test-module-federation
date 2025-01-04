import path from "path";
import { Configuration, container } from "webpack";
import merge from "webpack-merge";

import common from "./webpack.common";

export default merge<Configuration>(common, {
  mode: "production",

  output: {
    path: path.resolve("./public"),
    filename: "[name].[contenthash].js",
    clean: true,
  },

  plugins: [
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
});
