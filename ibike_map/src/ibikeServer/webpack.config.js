const path = require('path');

module.exports = {
    entry: './src/ibikeServer/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../..', 'dist/ibikeServer')
    },
    target: 'node',
    node: {
        __dirname: false
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.tsx?/, loader: 'ts-loader' }
        ]
    }
}