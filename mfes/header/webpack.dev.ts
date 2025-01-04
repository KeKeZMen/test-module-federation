import path from "path";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import common from "./webpack.common";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export default merge<Configuration>(common, {
  mode: "development",

  plugins: [new ReactRefreshWebpackPlugin()],

  devServer: {
    hot: true,
    port: 3001,
    static: path.resolve("./public"),
  },
});
