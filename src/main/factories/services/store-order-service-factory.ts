import { StoreOrderServiceImpl } from '../../../domain/services/store-order-service';
import { makeRabbitMQGateway } from '../gateways/rabbitmq-gateway-factory';
 
export const makeStoreOrderService = (): StoreOrderServiceImpl => {
    const gateway = makeRabbitMQGateway();
    return new StoreOrderServiceImpl(gateway);
}; 
