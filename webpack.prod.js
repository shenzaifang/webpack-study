'use strict';

const glob = require('glob');
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const setMPA = ()=>{
    let entry = {};
    let htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    /* entryFiles = [ '/Users/shenzaifang/shenzf/my-project/src/index/index.js',
       '/Users/shenzaifang/shenzf/my-project/src/search/index.js' ]*/
    entryFiles.forEach(entryFilePath=>{
        const match = entryFilePath.match(/src\/(.*)\/index.js/);
        const pageName = match && match[1];
        console.log('pageName = ',pageName);
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

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(__dirname,'dist'),
        filename: "[name]_[chunkhash:8].js"
    },
    mode: "production",
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
        new CleanWebpackPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                    global: 'ReactDOM',
                }
            ]
        })
    ].concat(htmlWebpackPlugins)
}
