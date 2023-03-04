import express from 'express';
import routes from './routes';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    // app.use(routes);
    app.get('/', (req, res) => {
        return res.json('tudo certo');
    })

    return app.listen(process.env.PORT, () => {
        console.log('🤞🤞 Server started on port 3333');
    });
});


