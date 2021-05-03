const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

const webpackDevConfig = {
    mode: "development",
    devtool: "source-map",
    entry: path.join(__dirname,'./src/index.tsx'),
    output: {
        path: path.join(__dirname,'./lib'),
        filename: 'modal.js'
    },
    devServer: {
        port: 8080,
        host: 'localhost',
        hot: true,
        contentBase: path.join(__dirname,'./lib')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(webpackDevConfig,webpackBaseConfig);