'use strict';

const glob = require('glob');
const path = require("path");
const webpack = require("webpack")
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const setMPA = () => {
    let entry = {};
    let htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    /* entryFiles = [ '/Users/shenzaifang/shenzf/my-project/src/index/index.js',
       '/Users/shenzaifang/shenzf/my-project/src/search/index.js' ]*/
    entryFiles.forEach(entryFilePath => {
        const match = entryFilePath.match(/src\/(.*)\/index.js/);
        const pageName = match && match[1];
        console.log('pageName = ', pageName);
        entry[pageName] = entryFilePath;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
    });
    return {entry, htmlWebpackPlugins};
};

const {entry, htmlWebpackPlugins} = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 102400
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        hot: true
    }
}
