const path = require('path');
const webpack = require('webpack');
const env = require('./env');

module.exports = {
    entry: './src/server/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    node: {
        __dirname: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.tsx?/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(env)
    ]
}