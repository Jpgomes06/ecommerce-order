import { ProcessOrderServiceImpl } from "../../../domain/services/process-order-service";
import { makeOrderRepository } from "../repositories/order-repository-factory";
 
export const makeProcessOrderService = (): ProcessOrderServiceImpl => {
    const repository = makeOrderRepository();
    return new ProcessOrderServiceImpl(repository);
}; 
