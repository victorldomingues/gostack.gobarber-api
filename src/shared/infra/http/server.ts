
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import uploadConfig from '@config/upload';
import 'reflect-metadata';
import '@shared/container'
import 'express-async-errors';
import '@shared/infra/typeorm';
import routes from './routes'
import AppError from '@shared/errors/AppError';



const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ status: 'error', message: err.message });
    }
    console.error(err);
    return response.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
    console.log("server listen port: ", 3333);
});
