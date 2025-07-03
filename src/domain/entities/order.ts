export type OrderStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';
export type PaymentMethod = 'CREDIT' | 'DEBIT' | 'PIX' | 'BOLETO';

export type OrderItem = {
    item_id: number;
    item_description: string;
    item_value: number;
    item_quantity: number;
    discount: number;
};

export type Address = {
    cep: number;
    street: string;
};

export type Order = {
    order_id: number;
    order_date: Date;
    orderStatus: OrderStatus;
    client_name: string;
    client_email: string;
    shipping_value: number;
    address: Address;
    paymentMethod: PaymentMethod;
    items: OrderItem[];
}; 
