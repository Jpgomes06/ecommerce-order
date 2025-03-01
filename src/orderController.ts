import { Router, Request, Response } from 'express';
const router = Router();

export class OrderController {
    createOrder(req: Request, res: Response) {
        const {
            orderId,
            orderDate,
            orderStatus,
            clientName,
            clientEmail,
            orderValue,
            shippingValue,
            address: { cep, street },
            paymentMethod,
            items
        } = req.body;
        try {
            const order = {
                orderId,
                orderDate,
                orderStatus,
                clientName,
                clientEmail,
                orderValue,
                shippingValue,
                address: {
                    cep,
                    street
                },
                paymentMethod,
                items
            };
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}
