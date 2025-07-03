import { Order } from '../entities/order';
import { LoadOrdersRepository } from '../contracts/repository';

export interface LoadOrdersService {
    execute(): Promise<Order[]>;
}

export class LoadOrdersServiceImpl implements LoadOrdersService {
    constructor(private readonly repository: LoadOrdersRepository) {}

    async execute(): Promise<Order[]> {
        return this.repository.loadAll();
    }
} 
