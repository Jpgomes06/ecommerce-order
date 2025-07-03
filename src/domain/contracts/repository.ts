import { Order } from '../entities/order';

export interface StoreOrderRepository {
    store(order: Order): Promise<boolean>;
}
 
export interface LoadOrdersRepository {
    loadAll(): Promise<Order[]>;
} 
