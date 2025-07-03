import { Controller } from '../contracts/controller';
import { HttpRequest, HttpResponse, created, serverError } from '../contracts/http';
import { StoreOrderService } from '../../domain/services/store-order-service';
import { Order } from '../../domain/entities/order';

export class StoreOrderController implements Controller {
    constructor(private readonly service: StoreOrderService) {}

    async handle(request: HttpRequest<Order>): Promise<HttpResponse> {
        try {
            if (!request.body) {
                throw new Error('Request body is required');
            }
            const result = await this.service.execute(request.body);
            return created({ success: result });
        } catch (error) {
            return serverError(error as Error);
        }
    }
} 
