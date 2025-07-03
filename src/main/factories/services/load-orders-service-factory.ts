import { LoadOrdersServiceImpl } from "../../../domain/services/load-orders-service";
import { makeOrderRepository } from "../repositories/order-repository-factory";
 
export const makeLoadOrdersService = (): LoadOrdersServiceImpl => {
    const repository = makeOrderRepository();
    return new LoadOrdersServiceImpl(repository);
}; 
