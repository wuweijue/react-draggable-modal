const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackBaseConfig = {
    
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: {
                                        version: 3
                                    },
                                    useBuiltIns: 'usage',
                                    targets: {
                                        ie: '9'
                                    }
                                }
                            ],
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [          
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: [
                                            ">0.2%",
                                            "not dead",
                                            "not op_mini all"
                                        ]
                                    })
                                ]
                            }         
                        }
                        
                    },
                    'less-loader',
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, //用于加速编译
                        }
                    }            
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                type: 'asset'
            },
        ]
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, 'node_modules', 'react'),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", '.less', ".json"]
    }
}

module.exports = webpackBaseConfig;