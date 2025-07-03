import { OrderConsumer } from "../../../infra/queue/order-consumer";
import { makeProcessOrderService } from "../services/process-order-service-factory";
 
export const makeOrderConsumer = (): OrderConsumer => {
    const service = makeProcessOrderService();
    return new OrderConsumer(service);
}; 
