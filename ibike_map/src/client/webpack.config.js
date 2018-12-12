const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../..", "dist/client"),
        chunkFilename: "[name].chunk.js"
    },
    devtool: "source-map",
    devServer: {
        contentBase: './dist'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.css$/, loader: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader')
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/client/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};