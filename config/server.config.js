const config = require('./config').createTarget({
	target: 'server',
});

module.exports = {
	...config.webpack,

	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
	},

	output: {
		...config.webpack.output,
		libraryTarget: 'commonjs2',
	},

	module: {
		...config.webpack.module,

		rules: [
			...config.webpack.module.rules,

			{
				test: /\.css$/,
				use: 'null-loader',
			},
		],
	},

	externals: {
		'express-session': 'commonjs express-session',
		express: 'commonjs express',
		react: 'commonjs react',
		'react-dom/server': 'commonjs react-dom/server',
		'react-router': 'commonjs react-router',
		'react-router-dom': 'commonjs react-router-dom',
	},
};
