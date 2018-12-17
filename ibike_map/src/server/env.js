const path = require('path');
const dotenv = require('dotenv');

const dotenvFiles = [
    '.env'
];

dotenvFiles.forEach(dotenvFile => {
    dotenv.config({
        path: path.resolve(__dirname, dotenvFile)
    })
});

const REACT_APP = /^REACT_APP/;

module.exports = Object.keys(process.env).filter(env => REACT_APP.test(env))
    .reduce((env, key) => {
        env[key] = process.env[key];
        return env;
    }, {});