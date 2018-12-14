import * as express from 'express';
import * as puppeteer from 'puppeteer';


export const createStaticApp = () => {
    const app = express();

    app.get('/', async (_, res) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://127.0.0.1:4416');
        const screenshot = await page.screenshot()
        res.setHeader('Content-Type', 'image/png');
        res.send(screenshot);
    });

    return app;
}

export const app = createStaticApp();

if (require.main === module) {
    app.listen(4413, () => {
        console.log('static server is running.');
    });
}