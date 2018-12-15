const webpack = require('webpack');
const nodemon = require('nodemon');
const serverConfig = require('../server/webpack.config');
const clientConfig = require('../client/webpack.config');


const createStartServer = scriptPath => {
    let serverRunning = false;
    return () => {
        if (serverRunning) {
            return;
        }
        serverRunning = true;
        nodemon({
            script: scriptPath,
            watch: scriptPath
        })
    };
};

const startServer = createStartServer('src/server/dist/main.js');
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
    startServer();
});


const clientWebpack = webpack(clientConfig);

clientWebpack.hooks.compile.tap("clientCompilingMessage", () => {
    console.log('client compiling...');
});

clientWebpack.watch({}, (_, stats) => {
    if (stats.hasErrors()) {
        console.log(stats);
        return;
    }
    console.log('client compiled.');
});