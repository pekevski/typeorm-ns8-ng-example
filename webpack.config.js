const webpack = require("@nativescript/webpack");
const webpackMerge = require("webpack-merge");

const { ProvidePlugin } = require("webpack");

module.exports = env => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  webpack.chainWebpack(config => {
    // Note: try typeorm v0.2.25

    // Add fallbacks for packages that TypeORM requires to work
    // based off webpack v4 fallbacks https://webpack.js.org/configuration/resolve/#resolvefallback
    const fallback = config.resolve.get("fallback");
    config.resolve.set(
      "fallback",
      webpackMerge.merge(fallback || {}, {
        assert: require.resolve("assert/"),
        buffer: require.resolve("buffer/"),
        events: require.resolve("events/"),
        timers: require.resolve("timers-browserify"),
        tty: require.resolve("tty-browserify"),
        fs: require.resolve("@nativescript/core/"),
        module: require.resolve("@nativescript/core/"),
        path: require.resolve("path-browserify"),
        process: require.resolve("process/browser"),
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util/"),
        url: require.resolve("url/")
      })
    );

    config.plugin("ProvidePlugin|Polyfills").use(ProvidePlugin, [
      {
        Buffer: [require.resolve("buffer/"), "Buffer"]
      }
    ]);

    // works without this...
    // config.resolve.alias.set('typeorm', 'typeorm/browser');
    config.resolve.alias.set("app-root-path", "~/shim/app-root-path");
    config.resolve.alias.set("supports-color", "supports-color/browser");

    config.set("externals", [
      ...config.get("externals"),
      "react-native-sqlite-storage",
      "mongodb",
      "@sap/hana-client",
      "hdb-pool",
      "mysql",
      "mysql2",
      "oracledb",
      "pg",
      "pg-native",
      "pg-query-stream",
      "typeorm-aurora-data-api-driver",
      "redis",
      "ioredis",
      "better-sqlite3",
      "sqlite3",
      "sql.js",
      "mssql"
    ]);

    config.plugin("DefinePlugin").tap(args => {
      Object.assign(args[0], {
        "process.env.NODE_DEBUG": false,
        "process.env": "global",
        "process.platform": JSON.stringify("nativescript"),
        "process.version": JSON.stringify("0.0.0")
      });

      return args;
    });

    // config.plugin('DefinePlugin').tap(args => {
    // 	console.log('test2', args)
    // 	Object.assign(args[0], {
    // 		process: 'global.process',
    // 	})

    // 	return args
    // })

    console.log("test1", config.resolve.get("fallback"));
  });

  return webpack.resolveConfig();
};
