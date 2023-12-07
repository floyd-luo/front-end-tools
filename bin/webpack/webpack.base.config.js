const path = require('path');
const webpack = require('webpack');
module.exports = {
    output: {
        path: path.resolve(__dirname, '../../build'),
        filename: '[name].js',
        publicPath: '/build/',
        libraryTarget: 'umd',
        library: 'front-ent-tools'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|build|coverage)/,
                options: {
                    "plugins": [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                            }
                        ]
                    ],
                    presets: ["@babel/preset-env"]
                }
            }, {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]_[local]_[hash:base64:3]'
                    }
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ // 定义环境变量
            'process.env': JSON.stringify(process.env.NODE_ENV)
        }),
    ]
};
