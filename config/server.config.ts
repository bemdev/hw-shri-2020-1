import { createTarget } from './config';
const cfg = createTarget('client');

export default {
	...cfg.webpack,

	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
	},

	output: {
		...cfg.webpack.output,
		libraryTarget: 'commonjs2',
	},

	module: {
		...cfg.webpack.module,

		rules: [
			...cfg.webpack.module.rules,

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
