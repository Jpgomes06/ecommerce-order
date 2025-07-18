import express from 'express';
import setupRoutes from './routes';

export const setupApp = (): express.Express => {
    const app = express();
    app.use(express.json());
    setupRoutes(app);
    return app;
}; 
