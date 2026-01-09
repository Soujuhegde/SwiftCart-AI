'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, Cart, updateCartItem, deleteCartItem, processPayment } from '@/lib/api';
import { toast } from 'sonner';

interface CartContextType {
    cart: Cart | null;
    isLoading: boolean;
    refreshCart: () => Promise<void>;
    updateQuantity: (itemId: string, delta: number) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    checkout: (amount: number, method: string) => Promise<boolean>;
    lastOrder: any | null;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [lastOrder, setLastOrder] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // In a real app, userId would come from AuthContext. 
    // For this demo, we use a static ID or localStorage.
    const userId = 'demo-user-id';

    const refreshCart = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getCart(userId);
            // Handle different potential response structures or flattened items
            // Assuming data is { ...cart, total } from backend
            if (data && (data.id || data.items)) {
                // If backend returns { items: [], total: 0 } without top level ID
                if (!data.id && data.items) {
                    // Normalize to Cart object
                    setCart({
                        id: 'temp-id',
                        userId,
                        status: 'ACTIVE',
                        items: data.items,
                        totalAmount: data.total || 0
                    } as any);
                } else {
                    setCart(data);
                }
            } else {
                setCart(null);
            }
        } catch (error) {
            // console.error('Failed to fetch cart:', error);
            // Silent fail or toast
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const updateQuantity = async (itemId: string, delta: number) => {
        const item = cart?.items.find((i: any) => i.id === itemId);
        if (!item) return;
        const newQty = item.quantity + delta;

        if (newQty < 1) {
            await removeFromCart(itemId);
            return;
        }

        try {
            // Optimistic update could go here
            await updateCartItem(itemId, newQty);
            await refreshCart();
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    const removeFromCart = async (itemId: string) => {
        try {
            await deleteCartItem(itemId);
            toast.success('Item removed');
            await refreshCart();
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const checkout = async (amount: number, method: string) => {
        if (!cart || !cart.id) return false;
        try {
            const response = await processPayment(cart.id, amount, method);
            if (response.success) {
                // Set last order for success page
                setLastOrder({
                    ...response.order, // Assuming backend returns order object
                    items: cart.items, // Keep items for receipt if backend doesn't return full line items
                    total: amount,
                    date: new Date().toLocaleDateString()
                });
                await refreshCart(); // Should be empty now
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    // Computed values
    const cartTotal = cart?.items.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0) || 0;
    const itemCount = cart?.items.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

    return (
        <CartContext.Provider value={{ cart, isLoading, refreshCart, updateQuantity, removeFromCart, checkout, lastOrder, cartTotal, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
