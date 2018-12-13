const path = require('path');

module.exports = {
    entry: './src/server/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../..', 'dist/server')
    },
    target: 'node',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?/, loader: 'ts-loader' },
            { test: /\.css$/, loader: 'css-loader' },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader')
            },
        ]
    }
}