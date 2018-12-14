const webpack = require('webpack');
const nodemon = require('nodemon');
const staticServerConfig = require('../staticServer/webpack.config');
const ibikeServerConfig = require('../ibikeServer/webpack.config');
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

const startStaticServer = createStartServer('dist/staticServer/main.js');
const staticServerWebpack = webpack(staticServerConfig);

staticServerWebpack.hooks.compile.tap("serverCompilingMessage", () => {
    console.log('static server compiling...');
});

staticServerWebpack.watch({}, (_, stats) => {
    if (stats.hasErrors()) {
        console.log(stats);
        return;
    }
    console.log('ibike server compiled.');
    startStaticServer();
});


const startIbikeServer = createStartServer('dist/ibikeServer/main.js');
const ibikeServerWebpack = webpack(ibikeServerConfig);

ibikeServerWebpack.hooks.compile.tap("serverCompilingMessage", () => {
    console.log('ibike server compiling...');
});

ibikeServerWebpack.watch({}, (_, stats) => {
    if (stats.hasErrors()) {
        console.log(stats);
        return;
    }
    console.log('ibike server compiled.');
    startIbikeServer();
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