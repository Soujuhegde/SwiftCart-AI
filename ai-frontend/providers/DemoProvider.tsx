
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
// import { io, Socket } from 'socket.io-client';

// Types
export type Product = {
    id: string; // Backend uses integer IDs usually, but string is fine for frontend if casted
    name: string;
    price: number;
    category: string; // API needs to return this
    image: string;
    sku: string;
    stock: number;
    brand?: string;
    source?: string;
};

export type CartItem = Product & { qty: number };

export type DemoContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    cartTotal: number;
    inventory: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    salesStats: {
        revenue: number;
        transactions: number;
        itemsSold: number;
    };
    processPayment: () => void;
    resetDemo: () => void;
    lastOrder: {
        items: CartItem[];
        total: number;
        date: string;
    } | null;
    user: {
        name: string;
        role: string;
        branch: string;
        avatar: string;
    };
    updateUser: (updates: Partial<{ name: string; role: string; branch: string; avatar: string }>) => void;
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const API_URL = ''; // Use relative paths for proxy support
// const socket = io(API_URL);

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [inventory, setInventory] = useState<Product[]>([]);
    const [salesStats, setSalesStats] = useState({
        revenue: 0,
        transactions: 0,
        itemsSold: 0
    });
    const [lastOrder, setLastOrder] = useState<DemoContextType['lastOrder']>(null);
    const [user, setUser] = useState({
        name: "Alex Morgan",
        role: "Store Manager",
        branch: "Downtown Branch",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgBMLqmC22OkyVbFgGvZBX2kCdC9shAiRVENnhIIXNY4mY9QeQcqSdaieW99oZxI-020rG5nZI0YK3HobjERx00T54J34SSwC6lZw7lyENrUrS-qq0-GhrHLj2ELcffS-N4iyyJwZopEGY6TX0QgbLAjuRUrDXBe3VytlaerSlyMjVtI4BWs5cP1VA5oXVs5pSOn-s8BZclceZJBddn19lOwNiGADiTQgjvHp5PekWGqJJLsO_yWCbv0rSgijAeRRDMXnb9bE2JN90"
    });

    const cartTotal = cart.reduce((total, item) => total + Number(item.price) * item.qty, 0);

    // Initial Data Fetch & Socket Setup
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/products`);
                // Ensure price is number
                const data = res.data.products || [];
                const products = data.map((p: any) => ({
                    ...p,
                    price: Number(p.price),
                    sku: p.barcode || p.sku || `SKU-${p.id}`,
                    // Prioritize backend image, then fallback
                    image: p.imageUrl ||
                        p.image ||
                        `https://placehold.co/400x400?text=${encodeURIComponent(p.name)}`
                }));
                console.log('Sample product:', products[0]?.name, 'imageUrl:', data[0]?.imageUrl, 'mapped image:', products[0]?.image);
                setInventory(products);
            } catch (error) {
                console.error("Failed to fetch inventory:", error);
            }
        };

        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/dashboard/stats`);
                if (res.data) {
                    setSalesStats({
                        revenue: res.data.revenue,
                        transactions: res.data.transactions,
                        itemsSold: res.data.itemsSold
                    });
                }
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchInventory();
        fetchStats();

        // Socket Listeners (Disabled for REST-only backend)
        /*
        socket.on('inventory_update', (updatedProducts: any[]) => {
            const products = updatedProducts.map((p: any) => ({
                ...p,
                price: Number(p.price)
            }));
            setInventory(products);
        });

        socket.on('dashboard_update', () => {
            fetchStats(); // Refetch to ensure accuracy
        });

        return () => {
            socket.off('inventory_update');
            socket.off('dashboard_update');
        };
        */
    }, []);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const addProduct = async (product: Product) => {
        // Optimistic update
        setInventory(prev => [product, ...prev]);

        // Also call backend API to persist
        try {
            await axios.post(`${API_URL}/api/products/manual`, {
                name: product.name,
                price: product.price,
                stock: product.stock,
                imageUrl: product.image, // Product type has 'image', backend expects 'imageUrl'
                userId: "retailer-1" // minimal mock auth
            });
        } catch (e) {
            console.error("Failed to persist product manual add", e);
            toast.error("Failed to save to database");
        }
    };

    const deleteProduct = (productId: string) => {
        setInventory(prev => prev.filter(p => p.id !== productId));
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(p => p.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === productId) {
                    const newQty = Math.max(0, item.qty + delta);
                    return { ...item, qty: newQty };
                }
                return item;
            }).filter(item => item.qty > 0);
        });
    };

    const processPayment = async () => {
        try {
            const orderPayload = {
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.qty,
                    price: item.price
                })),
                totalAmount: cartTotal * 1.08, // Backend expects totalAmount
                userId: 1 // Default to user 1 for now, or null
            };

            await axios.post(`${API_URL}/api/orders`, orderPayload);

            // Backend will emit updates, so we just clear cart and set local lastOrder receipt
            setLastOrder({
                items: [...cart],
                total: cartTotal * 1.08,
                date: new Date().toLocaleString()
            });

            setCart([]);
        } catch (error) {
            console.error("Payment processing failed:", error);
            // Handle error (maybe show toast)
        }
    };

    const resetDemo = () => {
        setCart([]);
        setLastOrder(null);
        // We might want to reset DB too via API, but for now just frontend reset
    };

    const updateUser = (updates: Partial<typeof user>) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    return (
        <DemoContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal,
            inventory,
            addProduct,
            deleteProduct,
            salesStats,
            processPayment,
            resetDemo,
            lastOrder,
            user,
            updateUser
        }}>
            {children}
        </DemoContext.Provider>
    );
};

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error("useDemo must be used within a DemoProvider");
    }
    return context;
};

