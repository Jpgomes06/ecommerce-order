import * as amqp from 'amqplib';
import { Order } from '../../domain/entities/order';
import { QueueGateway } from '../../domain/contracts/queue';

export class RabbitMQGateway implements QueueGateway {
    private connection?: amqp.Connection;
    private channel?: amqp.Channel;
    private readonly queueName = process.env.QUEUE_NAME || 'orders_queue';

    constructor() {
        this.connect();
    }

    private async connect(): Promise<void> {
        try {
            const url = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672';
            this.connection = await amqp.connect(url);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queueName, { durable: true });
            console.log('rabbitmq gateway connected');
        } catch (error) {
            console.error('RabbitMQ connection error:', error);
        }
    }

    async publish(order: Order): Promise<boolean> {
        try {
            if (!this.channel) {
                await this.connect();
            }

            const message = JSON.stringify(order);
            this.channel?.sendToQueue(this.queueName, Buffer.from(message), {
                persistent: true,
            });

            return true;
        } catch (error) {
            return false;
        }
    }
} 
