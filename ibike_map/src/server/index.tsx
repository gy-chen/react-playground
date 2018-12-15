import * as express from 'express';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as querystring from 'querystring';
import { findGeolocation } from './geolocation';

const CLIENT_PATH = path.resolve(__dirname, '../client/dist/index.html');

export const createApp = () => {
    const app = express();

    app.get('/', async (req, res) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const geolocation = findGeolocation(req.ip) || {};
        const qs = querystring.stringify(geolocation);
        await page.goto(`file://${CLIENT_PATH}?${qs}`);
        const screenshot = await page.screenshot()
        res.setHeader('Content-Type', 'image/png');
        res.send(screenshot);
    });

    return app;
}

export const app = createApp();

if (require.main === module) {
    app.listen(4413, () => {
        console.log('server is running.');
    });
}