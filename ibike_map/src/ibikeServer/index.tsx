
import * as express from 'express';
import * as path from 'path';

const CLIENT_PATH = path.join(__dirname, '../client');


export const createIbikeApp = () => {
    const app = express();

    app.use(express.static(CLIENT_PATH));

    return app;
}

export const app = createIbikeApp();

if (require.main === module) {
    app.listen(4416, () => {
        console.log('ibike server is running.');
    });
}