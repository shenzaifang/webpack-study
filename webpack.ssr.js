'use strict';

const glob = require('glob');
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const setMPA = ()=>{
    let entry = {};
    let htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/search-server.js'));
    entryFiles.forEach(entryFilePath=>{
        const match = entryFilePath.match(/src\/(.*)\/search-server.js/);
        const pageName = match && match[1];
        if(pageName){
            entry[pageName] = entryFilePath;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['common',pageName],
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
        }
    });
    return {entry, htmlWebpackPlugins};
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(__dirname,'dist'),
        filename: "[name]-server.js",
        libraryTarget: "umd"
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test:/.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: "postcss-loader",
                        options:{
                            plugins: ()=>[
                                require('autoprefixer')({
                                    Browserslist:['last 2 version', '>1%',"ios 7"]
                                })
                            ]
                        }
                    },
                    {
                        loader: "px2rem-loader",
                        options:{
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test:/.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader: "file-loader",
                        options:{
                            name:'[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader: "file-loader",
                        options:{
                            name:'[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    optimization: {
        splitChunks: {
            minSize: 0,//设置最小 分离包体积的大小为0
            cacheGroups: {
                commons:{
                    name:"common",
                    chunks: 'all',
                    minChunks: 2//设置最小引用次数为2次
                }
            }
        }
    }
}
