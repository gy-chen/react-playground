import * as express from 'express';
import * as path from 'path';

const CLIENT_PATH = path.join(__dirname, '../client');

export const createApp = () => {
    const app = express();
    app.use(express.static(CLIENT_PATH));

    return app;
}

export const app = createApp();

if (require.main === module) {
    app.listen(4413, () => {
        console.log('server is running.');
    });
}