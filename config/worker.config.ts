import webpack, { Configuration } from 'webpack';
import { join } from 'path';

import { createTarget } from './config';
const cfg = createTarget('sw');

const filter = (arr: [string]) => arr.filter(Boolean);

export default {
	...cfg.webpack,

    entry: join(__dirname, '../app/src/', 'service-worker', 'index.ts'),

    output: {
        path: join(__dirname, '../public/client/'),
        filename: 'sw.js'
    },

	module: {
		rules: [
			...cfg.webpack.module.rules,
		],
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
	],
};
