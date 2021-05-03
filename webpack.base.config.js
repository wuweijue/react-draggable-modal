const path = require('path')

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
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [          
                    'style-loader',
                    'css-hot-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        
                    }
                    
                ]
            },
            {
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
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['src','node_modules'],
        alias: {
            'react': path.resolve(__dirname, 'node_modules', 'react'),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", '.less', ".json"]
    }
}

module.exports = webpackBaseConfig;