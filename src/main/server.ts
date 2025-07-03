import 'dotenv/config';
import mongoose from 'mongoose';
import { makeOrderConsumer } from './factories/consumers/order-consumer-factory';
import { setupApp } from './config/app';
import env from './config/env';

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(env.mongoUrl);
        console.log('MongoDB connected');

        const app = setupApp();

        const consumer = makeOrderConsumer();
        await consumer.start();
        console.log('Consumer started');

        app.listen(env.port, () => {
            console.log(`Server running on port ${env.port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

start(); 
