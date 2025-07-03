import { LoadOrdersController } from '../src/presentation/controllers/load-orders-controller';
import { LoadOrdersService } from '../src/domain/services/load-orders-service';

describe('LoadOrdersController', () => {
    const makeServiceStub = (): LoadOrdersService => {
        return {
            execute: jest.fn().mockResolvedValue([
                {
                    order_id: 1001,
                    client_name: 'John Doe',
                    orderStatus: 'COMPLETED',
                },
            ]),
        };
    };
    it('should return 200 and the orders on success', async () => {
        const serviceStub = makeServiceStub();
        const controller = new LoadOrdersController(serviceStub);
        const httpResponse = await controller.handle({});
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual([
            {
                order_id: 1001,
                client_name: 'John Doe',
                orderStatus: 'COMPLETED',
            },
        ]);
    });
    it('should return 500 if service throws', async () => {
        const serviceStub = makeServiceStub();
        (serviceStub.execute as jest.Mock).mockRejectedValueOnce(new Error('Service error'));
        const controller = new LoadOrdersController(serviceStub);
        const httpResponse = await controller.handle({});
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual({ error: 'Service error' });
    });
});
