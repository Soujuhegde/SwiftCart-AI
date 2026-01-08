import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Product {
    id: string;
    barcode: string;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    isCustom: boolean;
    category?: string;
}

export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    price: number;
    product: Product;
}

export interface Cart {
    id: string;
    userId: string;
    status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
    items: CartItem[];
    payment?: any;
    totalAmount?: number; // Computed on frontend usually, or backend
}

export const scanProduct = async (barcode: string, userId?: string) => {
    const response = await api.post('/scan', { barcode, userId });
    return response.data;
};

export const manualAddProduct = async (data: any, userId?: string) => {
    const response = await api.post('/manual-add', { ...data, userId });
    return response.data;
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
    const response = await api.put('/cart', { cartItemId, quantity });
    return response.data;
};

export const deleteCartItem = async (cartItemId: string) => {
    const response = await api.delete(`/cart?cartItemId=${cartItemId}`);
    return response.data;
};

export const getCart = async (userId: string) => {
    const response = await api.get(`/cart?userId=${userId}`);
    return response.data;
};

export const processPayment = async (cartId: string, amount: number, method: string) => {
    const response = await api.post('/payment', { cartId, amount, method });
    return response.data;
};

export default api;
