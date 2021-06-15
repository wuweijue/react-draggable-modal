const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpackProdConfig = {
    mode: 'production',
    entry: {
        app: [path.join(__dirname, './src/components/index.tsx')]
    },
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'index.js',
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'modal.css'
        }),
        new CopyPlugin({
            patterns: [
                { 
                    context: 'src/components',
                    from: '**/*.d.ts' ,
                    to: ".", 
                },
            ],
        }),
        
    ]
}

module.exports = merge(webpackProdConfig, webpackBaseConfig)