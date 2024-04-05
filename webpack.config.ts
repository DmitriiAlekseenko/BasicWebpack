import webpack from "webpack";

import { buildWebpack } from "./config/build/buildWebpack";
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from "./config/build/types/types";
import path from "path";

interface IEnvVariable {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: IEnvVariable) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    platform: env.platform ?? "desktop",
    paths,
  });

  return config;
};
