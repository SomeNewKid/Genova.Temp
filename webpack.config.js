const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssPrettify = require('postcss-prettify');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        styles: './Styles/site.scss',  // SASS Entry Point
        site: './Scripts/site.ts',  // TypeScript Entry Point
    },
    output: {
        path: path.resolve(__dirname, './wwwroot'), // Base output directory
        filename: (pathData) => {
            return pathData.chunk.name === 'site' ? '-/scripts/site.js' : '-/scripts/[name].js';
        },
        libraryTarget: "umd", // Ensures modules work in browser environments
    },
    module: {
        rules: [
            // SCSS Compilation
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
            // TypeScript Compilation
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '-/styles/site.css', // Output CSS file
        }),
        new BrowserSyncPlugin({
            proxy: "http://localhost:7170", // Match ASP.NET Core backend URL
            files: ["wwwroot/-/styles/site.css", "wwwroot/-/scripts/site.js"], // Watch for changes
            injectChanges: true,
            watch: true,
            reloadDelay: 500,
            open: false, // Prevent BrowserSync from opening a new browser window
        }),
    ],
    optimization: {
        minimize: false,
    },
    devtool: 'source-map',
    watch: process.env.NODE_ENV === 'development',
};
