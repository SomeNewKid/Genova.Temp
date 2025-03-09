const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssPrettify = require('postcss-prettify');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './Styles/site.scss',  // Your main SASS entry file
    output: {
        path: path.resolve(__dirname, './wwwroot/-/styles'),
        filename: 'bundle.js',  // Webpack requires an output JS file, even if unused
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [PostCssPrettify()],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'site.css',
        }),
        new BrowserSyncPlugin({
            proxy: "http://localhost:7170", // Your ASP.NET Core backend URL
            files: ["wwwroot/-/styles/site.css"],
            injectChanges: true,
            watch: true,
            reloadDelay: 500,
            open: false, // Prevent BrowserSync from opening a new browser window
        }),
    ],
    optimization: {
        minimize: false, // Ensure Webpack does not apply minification
    },
    devtool: 'source-map',
    watch: process.env.NODE_ENV === 'development', // Auto-recompile in development
};