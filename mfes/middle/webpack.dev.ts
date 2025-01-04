import { container, type Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";

import common from "./webpack.common";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export default merge<Configuration>(common, {
  mode: "development",

  devServer: {
    hot: true,
    port: 3000,
  },

  plugins: [
    new container.ModuleFederationPlugin({
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        footer: "footer@http://localhost:3002/remoteEntry.js",
      },
    }),
  ],
});
