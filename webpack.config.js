const path = require('path')
// HtmlWebpackPulgin 自动生成html文件 入口改变时 不需要手动更改index.html的引入了
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 每次打包前清空对应目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    devtool: 'inline-source-map',
    // webpack-dev-server插件 检测代码变化并自动重新编译并自动刷新浏览器
    // 使用 webpack-dev-server 时，webpack 并没有将所有生成的文件写入磁盘，而是放在内存中，提供更快的内存内访问，便于实时更新
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true, // 告诉 dev-server 我们在用 HMR
        hotOnly: true // 禁用自动刷新
    },
    // 单入口
    entry: './src/index.js',
    // 多入口
    // entry: {
    //     app: './src/index.js',
    //     print: './src/print.js'
    // },
    // filename: '[name].bundle.js'中的[name]会替换为对应的入口起点名
    output: {
        // filename: 'bundle.js',  // 输出文件名
        filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')   // 输出文件所在目录
    },
    // style-loader 通过插入<style>标签将css插入到dom
    // css-loader 解释@import ulr()
    // 指示 webpack 以文件格式发出所需对象并返回文件的公共URL，可用于任何文件的加载
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack3Demo',
            filename: 'index1.html'
        }),
        // [chunkhash]不能和 HMR 一起使用
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
        new CleanWebpackPlugin(['dist'])
    ]
}