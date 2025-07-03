import { LoadOrdersController } from "../../../presentation/controllers/load-orders-controller";
import { makeLoadOrdersService } from "../services/load-orders-service-factory";

export const makeLoadOrdersController = (): LoadOrdersController => {
    const service = makeLoadOrdersService();
    return new LoadOrdersController(service);
}; 
