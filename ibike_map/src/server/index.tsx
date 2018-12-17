import * as express from 'express';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as querystring from 'querystring';
import { findGeolocation } from './geolocation';

const CLIENT_PATH = path.resolve(__dirname, '../client/dist/index.html');

export const createApp = () => {
    const app = express();
    app.set('trust proxy', true);

    app.get('/', async (req, res) => {
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser',
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        const geolocation = findGeolocation(req.ip) || {};
        const qs = querystring.stringify(geolocation);
        await page.goto(`file://${CLIENT_PATH}?${qs}`);
        const screenshot = await page.screenshot({
            encoding: 'base64'
        });
        res.send(`
        <!doctype html>
        <html>
        <head>
            <style>
            body {
                width: 100%;
                height: 100vh;
                margin: 0;
            }

            img {
                width: 100%;
            }
            </style>
        </head>
        <body>
            <img src="data:image/png;base64,${screenshot}" />
        </body>
        </html>
        `)
        await browser.close();
    });

    return app;
}

export const app = createApp();

if (require.main === module) {
    app.listen(4413, () => {
        console.log('server is running.');
    });
}