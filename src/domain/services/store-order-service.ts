import { Order } from '../entities/order';
import { QueueGateway } from '../contracts/queue';

export interface StoreOrderService {
    execute(order: Order): Promise<boolean>;
}

export class StoreOrderServiceImpl implements StoreOrderService {
    constructor(private readonly queueGateway: QueueGateway) {}

    async execute(order: Order): Promise<boolean> {
        return this.queueGateway.publish(order);
    }
} 
