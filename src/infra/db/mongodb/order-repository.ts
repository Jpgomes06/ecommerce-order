import { Order } from '../../../domain/entities/order';
import { StoreOrderRepository, LoadOrdersRepository } from '../../../domain/contracts/repository';
import { OrderModel } from './models/order-model';

export class OrderMongoRepository implements StoreOrderRepository, LoadOrdersRepository {
    async store(order: Order): Promise<boolean> {
        try {
            await OrderModel.create(order);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async loadAll(): Promise<Order[]> {
        const orders = await OrderModel.find().lean();
        return orders as Order[];
    }
} 
