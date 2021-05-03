const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: [path.join(__dirname,'./src/components/index.tsx')]
    },
    output: {
        path: path.join(__dirname,'./lib'),
        filename: 'modal.js',
        libraryTarget: 'commonjs2'
    },
    externals: [
        nodeExternals()
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                parallel: 4,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}

module.exports = merge(webpackProdConfig,webpackBaseConfig)