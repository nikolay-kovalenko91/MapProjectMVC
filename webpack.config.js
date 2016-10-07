var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },
    output: {
        path: __dirname + '/resources/public',
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            {
                test: /\.ts/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {   test: /\.pug$/,
                loader: 'pug-ng-html'
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './resources/public',
        hot:true,
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    }
};