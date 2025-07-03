import { OrderMongoRepository } from '../../../infra/db/mongodb/order-repository';
 
export const makeOrderRepository = (): OrderMongoRepository => {
    return new OrderMongoRepository();
}; 
