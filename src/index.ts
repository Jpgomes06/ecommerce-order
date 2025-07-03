import 'dotenv/config';
import mongoose from 'mongoose';
import { setupApp } from './main/config/app';
import env from './main/config/env';

mongoose.connect(env.mongoUrl)
    .then(async () => {
        console.log('MongoDB connected');
        const app = setupApp();
        app.listen(env.port, () => {
            console.log(`Server running on port ${env.port}`);
        });
    })
    .catch(console.error); 
    