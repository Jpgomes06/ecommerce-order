import { Express, Router } from 'express';
import orderRoutes from '../routes/order-routes';

export default (app: Express): void => {
    const router = Router();
    app.use('/api/v1', router);
    orderRoutes(router);
}; 
