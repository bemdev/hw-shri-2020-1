import { join } from 'path';
import webpack from 'webpack';
// import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import WebpackLoggerPlugin from 'webpack-logger-plugin';

const { NODE_ENV = 'development' } = process.env;

const IS_DEVELOPMENT = NODE_ENV === 'development';

export default function commonConfig() {
    return {
        port: 3000,
        publicPath: '/assets/',
    };
};

export function createTarget(target: string):any { //WTG CONFIGURE ? Configuration ? root ?

    let { publicPath } = commonConfig();

    /**
     * Root of project
     */
    let root = join(__dirname, '../app');

    /**
     * Path for compiled assets
     */
    let dist = join(root, '../public', target);

    /**
     * Source directory
     */
    let src = join(root, 'src');

    /**
     * Name of output bundles
     */
    let name = IS_DEVELOPMENT ? '[name].js' : '[hash:16].js';

    // let IS_SERVER = target === 'server';
    // let IS_CLIENT = target === 'client';

    return {
        root,
        src,
        dist,

        isDevelopment: IS_DEVELOPMENT,

        webpack: {
            name: target,
            target: 'node',
            entry: join(src, target + '.ts'),
            devtool: IS_DEVELOPMENT ? 'cheap-module-eval-source-map' : false,
            mode: NODE_ENV,
            // watch: IS_DEVELOPMENT,

            output: {
                path: dist,
                filename: name,
                chunkFilename: name,
                publicPath,
            },

            stats: {
                entrypoints: true,
            },

            resolve: {
                modules: ['node_modules', 'src/components'],
                extensions: ['.ts', '.tsx', '.js', '.jsx', ],
            },

            module: {
                rules: [
                    {
                        test: /\.js?|.jsx?/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins: ['@babel/plugin-transform-runtime'],
                            },
                        },
                    },
                    {
                        test: /\.tsx?$/,
                        loader: 'awesome-typescript-loader',
                    },
                ],
            },

            plugins: [
                //if we need define how check side uncomment this
                // new webpack.DefinePlugin({
                // 	IS_SERVER: JSON.stringify(IS_SERVER),
                // 	IS_CLIENT: JSON.stringify(IS_CLIENT),
                // 	'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined'),
                // 	'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                // }),

                new webpack.NoEmitOnErrorsPlugin(),

                // ...(IS_DEVELOPMENT ? [] : [new UglifyJSPlugin()]),

                new WebpackLoggerPlugin(),
            ],
        },
    };
}
