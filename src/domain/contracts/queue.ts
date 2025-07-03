import { Order } from '../entities/order';
 
export interface QueueGateway {
    publish(order: Order): Promise<boolean>;
} 
