import path from "path";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";

import common from "./webpack.common";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export default merge<Configuration>(common, {
  mode: "development",

  devServer: {
    static: path.resolve("./public"),
    hot: true,
    port: 3002,
  },
});
