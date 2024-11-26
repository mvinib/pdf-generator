import 'express-async-errors';
import http from 'http';
import express, {  Express } from 'express';
import cors from 'cors';

import { errorMiddleware } from '../middlewares/error';
import routes from './routes';
import { showRequestMiddleware } from '../middlewares/showBody';
const app: Express = express();


app.use(express.json({
    limit: '1mb',
}));
app.use(cors({
    allowedHeaders: [
        '*',
    ],
}));
app.use(showRequestMiddleware);
app.use(routes);
app.use(errorMiddleware);

const server = http.createServer(app);
export default server;
