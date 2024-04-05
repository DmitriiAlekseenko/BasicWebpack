import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isProd = options.mode === "production";

  const svgrLoader = {
    test: /\.svg$/i,
    use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isProd
          ? "[hash:base64:8]"
          : "[name].[local].[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      cssLoaderWithModules,
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [!isProd && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  };

  const babelLoader = buildBabelLoader(options);

  return [svgrLoader, assetsLoader, scssLoader, babelLoader];
}
