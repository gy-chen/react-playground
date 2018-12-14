const path = require('path');

module.exports = {
    entry: './src/staticServer/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../..', 'dist/staticServer')
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
    }
}