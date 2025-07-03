import { RabbitMQGateway } from "../../../infra/queue/rabbitmq-gateway";
 
export const makeRabbitMQGateway = (): RabbitMQGateway => {
    return new RabbitMQGateway();
}; 
