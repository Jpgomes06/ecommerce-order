import { Controller } from '../contracts/controller';
import { HttpRequest, HttpResponse, ok } from '../contracts/http';
 
export class PingController implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        return ok('pong');
    }
} 
