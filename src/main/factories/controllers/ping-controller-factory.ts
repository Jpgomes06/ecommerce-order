import { PingController } from '../../../presentation/controllers/ping-controller';
 
export const makePingController = (): PingController => {
    return new PingController();
}; 
