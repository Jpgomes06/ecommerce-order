import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    order_id: { type: Number, required: true },
    order_date: { type: Date, required: true },
    orderStatus: {
        type: String,
        enum: ["OPEN", "CLOSED", "CANCELLED"],
        required: true,
    },
    client_name: { type: String, required: true },
    client_email: { type: String, required: true },
    shipping_value: { type: Number, required: true },
    address: {
        cep: { type: Number, required: true },
        street: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        enum: ["CREDIT", "DEBIT", "PIX", "BOLETO"],
        required: true,
    },
    items: [{
        item_id: { type: Number, required: true },
        item_description: { type: String, required: true },
        item_value: { type: Number, required: true },
        item_quantity: { type: Number, required: true },
        discount: { type: Number, required: true },
    }],
});

export const OrderModel = mongoose.model("Order", OrderSchema); 
