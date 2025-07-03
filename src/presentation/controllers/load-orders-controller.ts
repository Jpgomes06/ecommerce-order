import { Controller } from '../contracts/controller';
import { HttpRequest, HttpResponse, ok, serverError } from '../contracts/http';
import { LoadOrdersService } from '../../domain/services/load-orders-service';

export class LoadOrdersController implements Controller {
    constructor(private readonly service: LoadOrdersService) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const orders = await this.service.execute();
            return ok(orders);
        } catch (error) {
            return serverError(error as Error);
        }
    }
} 
