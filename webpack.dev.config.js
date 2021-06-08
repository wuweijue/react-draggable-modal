const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = '8084';

const webpackDevConfig = {
    mode: "development",
    devtool: "source-map",
    entry: [
        path.join(__dirname,'./src/index.tsx'),
    ],
    output: {
        path: path.join(__dirname,'./lib'),
        filename: 'modal.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './lib/modal.css'
        })
    ],
    devServer: {
        port,
        publicPath: '/',
        stats: 'minimal',
        hot: true,
        open: true,
        proxy: {
            '/api': {
                changeOrigin: true,
                secure: false,
                target: 'https://apps.chinadci.com/',
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        contentBase: path.join(__dirname, './public'),
    }
}

module.exports = merge(webpackDevConfig,webpackBaseConfig);