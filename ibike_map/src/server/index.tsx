import * as express from 'express';
import * as puppeteer from 'puppeteer';
import * as path from 'path';

const CLIENT_PATH = path.resolve(__dirname, '../client/dist/index.html');
console.log(CLIENT_PATH)


export const createApp = () => {
    const app = express();

    app.get('/', async (_, res) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`file://${CLIENT_PATH}`);
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