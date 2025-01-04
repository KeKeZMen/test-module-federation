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
      name: "header",
      filename: "remoteEntry.js",
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
});
