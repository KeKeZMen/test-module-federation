import path from "path";
import { container, type Configuration } from "webpack";
import { merge } from "webpack-merge";

import common from "./webpack.common";

export default merge<Configuration>(common, {
  mode: "production",

  output: {
    path: path.resolve("./public"),
    filename: "bundle.js",
    clean: true,
  },

  plugins: [
    new container.ModuleFederationPlugin({
      remotes: {
        header: "header@https://kekez.ru/header/remoteEntry.js",
        footer: "footer@https://kekez.ru/footer/remoteEntry.js",
      },
    }),
  ],
});
