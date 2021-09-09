const webpack = require("@nativescript/webpack");
const webpackMerge = require('webpack-merge');

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	webpack.chainWebpack(config => {

		// Note: try typeorm v0.2.25
		config.resolve.alias.set('typeorm', 'typeorm/browser');

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
				process: require.resolve('process/browser'),
				os: require.resolve("os-browserify/browser"),
				stream: require.resolve("stream-browserify"),
				util: require.resolve("util/"),
				url: require.resolve('url/')
			})
		);

		// config.plugin('DefinePlugin').tap(args => {
		// 	console.log('test2', args)
		// 	Object.assign(args[0], {
		// 		process: 'global.process',
		// 	})
	
		// 	return args
		// })

		console.log('test1', config.resolve.get("fallback"))
	});

	return webpack.resolveConfig();
};


