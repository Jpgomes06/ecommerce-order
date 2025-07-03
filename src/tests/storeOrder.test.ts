import { StoreOrderController } from '../presentation/controllers/store-order-controller'
import { StoreOrderService } from '../domain/services/store-order-service';
import { Order } from '../domain/entities/order';

describe('StoreOrderController', () => {
    const mockOrder: Order = {
        order_id: 1006,
        order_date: new Date('2025-04-29T10:30:00.000Z'),
        orderStatus: 'OPEN',
        client_name: 'Pedro',
        client_email: 'Pedro@example.com',
        shipping_value: 25.50,
        address: {
            cep: 12345678,
            street: 'Rua das Flores, 12333',
        },
        paymentMethod: 'CREDIT',
        items: [
            {
                item_id: 1,
                item_description: 'Camisa Polo',
                item_value: 99.90,
                item_quantity: 2,
                discount: 10.00,
            },
            {
                item_id: 2,
                item_description: 'Calça Jeans',
                item_value: 149.90,
                item_quantity: 1,
                discount: 0.00,
            },
        ],
    };

    const makeServiceStub = (): StoreOrderService => {
        return {
            execute: jest.fn().mockResolvedValue(true),
        };
    };

    it('should return 201 when order is created successfully', async () => {
        const serviceStub = makeServiceStub();
        const controller = new StoreOrderController(serviceStub);
        const httpResponse = await controller.handle({ body: mockOrder });
        expect(httpResponse.statusCode).toBe(201);
        expect(httpResponse.body).toEqual({ success: true });
    });

    it('should return 500 if the service throws an error', async () => {
        const serviceStub = makeServiceStub();
        (serviceStub.execute as jest.Mock).mockRejectedValueOnce(new Error('Service error'));
        const controller = new StoreOrderController(serviceStub);
        const httpResponse = await controller.handle({ body: mockOrder });
        expect(httpResponse.statusCode).toBe(500);
    });

    it('should return 500 if body is not sent', async () => {
        const serviceStub = makeServiceStub();
        const controller = new StoreOrderController(serviceStub);
        const httpResponse = await controller.handle({ });
        expect(httpResponse.body).toEqual({ "error": 'Request body is required' });
    });
});
