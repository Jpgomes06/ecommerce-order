export default {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URI || 'mongodb://mongo:27017/orders',
    rabbitUrl: process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672',
    queueName: process.env.QUEUE_NAME || 'orders_queue',
}; 
