import * as amqp from 'amqplib';
import { Order } from '../../domain/entities/order';
import { ProcessOrderService } from '../../domain/services/process-order-service';

export class OrderConsumer {
    private connection?: amqp.Connection;
    private channel?: amqp.Channel;
    private readonly queueName = process.env.QUEUE_NAME || 'orders_queue';

    constructor(private readonly processOrderService: ProcessOrderService) {}

    async start(): Promise<void> {
        try {
            const url = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672';
            this.connection = await amqp.connect(url);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queueName, { durable: true });

            this.channel.consume(this.queueName, async (message) => {
                if (message) {
                    await this.processMessage(message);
                }
            });
        } catch (error) {
            console.error('Consumer error:', error);
        }
    }

    private async processMessage(message: amqp.ConsumeMessage): Promise<void> {
        try {
            const order: Order = JSON.parse(message.content.toString());
            const success = await this.processOrderService.execute(order);

            if (success) {
                this.channel?.ack(message);
            } else {
                this.channel?.nack(message, false, true);
            }
        } catch (error) {
            this.channel?.nack(message, false, false);
        }
    }
} 
