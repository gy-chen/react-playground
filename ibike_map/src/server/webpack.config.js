const path = require('path');

module.exports = {
    entry: './src/server/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../..', 'dist/server')
    },
    target: 'node',
    node: {
        __dirname: false
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?/, loader: 'ts-loader' }
        ]
    }
}