import { StoreOrderController } from '../../../presentation/controllers/store-order-controller';
import { makeStoreOrderService } from '../services/store-order-service-factory';

export const makeStoreOrderController = (): StoreOrderController => {
    const service = makeStoreOrderService();
    return new StoreOrderController(service);
}; 
