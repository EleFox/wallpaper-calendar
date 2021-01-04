const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/main.js'),  //入口文件
    devServer: {
        compress: true,
        port: '9696',
        hot: true,
        inline: true,
        hotOnly: true,  //当编译失败时，不刷新页面
        overlay: true,  //用来在编译出错的时候，在浏览器页面上显示错误
        publicPath: '/',  //一定要加
        open: false,
        watchOptions: {
            ignored: /node_modules/, // 不监听的文件或文件夹，支持正则匹配
            aggregateTimeout: 1000, // 监听到变化后等1s再去执行动作
            poll: 1000 // 默认每秒询问1000次
        }

    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: 'media/[name].[hash:8].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[hash:8].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: '[name].[hash:8].js',   //打包后的名字  生成8位数的hash
        path: path.resolve(__dirname, '../dist')   //打包的路径
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: path.resolve(__dirname, '../dist/static')
                }
            ]
        }),
        new CleanWebpackPlugin()
    ]
}
