import { PingController } from '../src/presentation/controllers/ping-controller';

describe('PingController', () => {
    it('should return 200 and "pong" message', async () => {
        const controller = new PingController();
        const httpResponse = await controller.handle({});
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toBe('pong');
    });
});
