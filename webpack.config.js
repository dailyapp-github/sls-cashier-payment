const path = require("path");
const slsw = require("serverless-webpack");
// const nodeExternals = require("webpack-node-externals");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	target: "node",
	entry: slsw.lib.entries,
	mode: slsw.lib.webpack.isLocal ? "development" : "production",
	// externals: [/aws-sdk/],
	resolve: {
		extensions: [".mjs", ".ts", ".js", ".json", ".tsx", ".node"],
	},
	output: {
		libraryTarget: "commonjs",
		path: path.join(__dirname, ".webpack"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					transpileOnly: true,
					experimentalWatchApi: true,
				},
			},
		],
	},
	// plugins: [new BundleAnalyzerPlugin()],
};
