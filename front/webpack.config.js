const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./App.js",
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        // publicPath: path.join(__dirname, '../public')
        // contentBase: path.join(__dirname, '../public'),
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    ],
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]

            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    },
                },
                    {
                        loader: "image-webpack-loader"
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'images/icons-sprite.svg',
                            publicPath: 'images/svg-icons/'
                        }
                    },
                    {
                        loader: 'svgo-loader'
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]

            }
            // {
            //     test: /\.hbs$/,
            //     use: [
            //         {
            //             loader: "handlebars-loader",
            //             options: {
            //                 knownHelpersOnly: false,
            //                 // partialDirs: [path.join('./views', './views/partials')],
            //                 partialDirs: path.resolve(__dirname, '../views/partials')
            //             }
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new SpriteLoaderPlugin(),
        new MiniCssExtractPlugin('[name]/style.css'),
        // new HtmlWebpackPlugin({
        //     template: '../views/layouts/layout.hbs',
        //     minify: {
        //         collapseWhitespace: true,
        //         removeComments: true,
        //         removeRedundantAttributes: true,
        //         removeScriptTypeAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         useShortDoctype: true
        //     },
        // }),
    ],

};
