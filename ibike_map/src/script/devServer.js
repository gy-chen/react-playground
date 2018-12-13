const webpack = require('webpack');
const nodemon = require('nodemon');
const serverConfig = require('../server/webpack.config');
const clientConfig = require('../client/webpack.config');


let serverRunning = false;
const startServer = () => {
    serverRunning = true;
    const server = 'dist/server/main.js';
    nodemon({
        script: server,
        watch: server
    });
};

const serverWebpack = webpack(serverConfig);

serverWebpack.hooks.compile.tap("serverCompilingMessage", () => {
    console.log('server compiling...');
});

serverWebpack.watch({}, (_, stats) => {
    if (stats.hasErrors()) {
        console.log(stats);
        return;
    }
    console.log('server compiled.');
    if (!serverRunning) {
        startServer();
    }
});

const clientWebpack = webpack(clientConfig);

clientWebpack.hooks.compile.tap("cleintCompilingMessage", () => {
    console.log('client compiling...');
});

clientWebpack.watch({}, (_, stats) => {
    if (stats.hasErrors()) {
        console.log(stats);
        return;
    }
    console.log('client compiled.');
});