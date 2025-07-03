import { Router } from 'express';
import { adaptRoute } from '../../presentation/helpers/express-route-adapter';
import { makePingController } from '../factories/controllers/ping-controller-factory';
import { makeStoreOrderController } from '../factories/controllers/store-order-controller-factory';
import { makeLoadOrdersController } from '../factories/controllers/load-orders-controller-factory';

export default (router: Router): void => {
    router.get('/ping', adaptRoute(makePingController()));
    router.post('/order', adaptRoute(makeStoreOrderController()));
    router.get('/orders', adaptRoute(makeLoadOrdersController()));
}; 
