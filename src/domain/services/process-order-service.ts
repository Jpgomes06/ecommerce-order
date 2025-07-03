import { Order } from '../entities/order';
import { StoreOrderRepository } from '../contracts/repository';

export interface ProcessOrderService {
    execute(order: Order): Promise<boolean>;
}

export class ProcessOrderServiceImpl implements ProcessOrderService {
    constructor(private readonly repository: StoreOrderRepository) {}

    async execute(order: Order): Promise<boolean> {
        return this.repository.store(order);
    }
}
