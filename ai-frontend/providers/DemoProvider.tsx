
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    sku: string;
    stock: number;
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
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

// Dummy Data
const INITIAL_INVENTORY: Product[] = [
    {
        id: "1",
        name: "Organic Bananas",
        price: 0.69,
        category: "Produce",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvfEwYarE2a1JN-oH0BbniCmLUnhtNQSfbu9RMLNE6eo7_VWyGUi_Vv_HKIgwXxa_nPBpjrW90mFORsu1oi3jYFmdjKGUXXqMuSeCWmaEDcHh1XYPkuvwf4lzvg1L9GNsisdn99-tX8NcCticLztZlT93c9EJmO0aaUIqFCTBGWT4J3Qj3osz-nnyHIb1uaG9sDNKGca10IyxKJOFmOtVpNCkidhJhvUyKn2xNaO5MSRkVY1__dCyU9_JR4fwx57u1RU7mf_ah1WIm",
        sku: "BAN-001",
        stock: 142
    },
    {
        id: "2",
        name: "Almond Milk",
        price: 3.49,
        category: "Dairy",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ax2LDV98OUlaw2K9Y47keRNc0NPqXfcTXO8xuyyDi2qpdYdOhvVexBvkvZVYdPW9NX1pV5OzpNtvj9dzKkop62n2D8vdB7vmmCB_OVkswzDq78GnU5cTCuTCSrB9cjHwwdW3MxV_MfD8h6HnDpl7RfpY38Kog8kvCGngKtPz3UiYxCQv4sKrTWGtboEwJRk6uO60RjZUDXY-ROnQpaeB6aUqGA45KUr8Z63URzaEZUcwlonGSEAh4kQwV5-iHyYvosA6I1XZQcxr",
        sku: "MILK-ALM",
        stock: 24
    },
    {
        id: "3",
        name: "Sourdough Bread",
        price: 5.00,
        category: "Bakery",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApJkvB6NlRTcSRffviscWpCRP-oeLlNseAykcqhYzsx03HSapdr1mGgxmd4REZrRqx6b9ZBbl_1YuahfG2sH9q6VMfPtjLFMOh3nFkJmZaKDq5EuZwFgQ5e0KGFlnlG5oY6FcKt2TfH2XsIGAqV5qMfgZevw5OQUogCItmdKiSX7kgBXdOYz3626IT_h55z_eM5fUjh3KTrB0cEca8rS_zTSdDAqSAtIOkXhlOR5GS5iABXpdgNDG7CW1rz2qPygJTV9GaqUP_Pac4",
        sku: "BRD-SOUR",
        stock: 15
    },
    {
        id: "4",
        name: "Avocados (Pack)",
        price: 4.99,
        category: "Produce",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVAY3wjoo_Az5vpjUOzpf17gLYntHocOyl-F3cacOHwkqx4WgSia4HdU12ZMI1xBV2u4IvC14KAy0hNjEhaTBxyaW56Lasg9_LwQFZQLGSDT2Cl2QkdbbtjSDRbrdGoliNmvNvi4wUAy-COBzczaMLMHkFBzz38BYbpo6diW7wrM8xw4Y8xGk5uJOrfQBlttd2jsGG7VOL4stBJL3EBGUcBEj0f6xOB7UZnJQC4xJS0gofHLUxP0q0KWyv2IZ0sG6kmrSUQ5xgVf5F",
        sku: "AVO-PACK",
        stock: 8
    }
];

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [inventory, setInventory] = useState<Product[]>(INITIAL_INVENTORY);
    const [salesStats, setSalesStats] = useState({
        revenue: 3402.50,
        transactions: 142,
        itemsSold: 450
    });
    const [lastOrder, setLastOrder] = useState<DemoContextType['lastOrder']>(null);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const addProduct = (product: Product) => {
        setInventory(prev => [...prev, product]);
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

    const processPayment = () => {
        // 1. Update Inventory
        const newInventory = [...inventory];
        let itemsCount = 0;

        cart.forEach(cartItem => {
            const productIndex = newInventory.findIndex(p => p.id === cartItem.id);
            if (productIndex > -1) {
                newInventory[productIndex].stock = Math.max(0, newInventory[productIndex].stock - cartItem.qty);
            }
            itemsCount += cartItem.qty;
        });

        setInventory(newInventory);

        // 2. Update Sales Stats
        setSalesStats(prev => ({
            revenue: prev.revenue + cartTotal,
            transactions: prev.transactions + 1,
            itemsSold: prev.itemsSold + itemsCount
        }));

        // 3. Save Order for Receipt
        setLastOrder({
            items: [...cart],
            total: cartTotal * 1.08, // Adding tax
            date: new Date().toLocaleString()
        });

        // 4. Clear Cart
        setCart([]);
    };

    const resetDemo = () => {
        setCart([]);
        setInventory(INITIAL_INVENTORY);
        setSalesStats({
            revenue: 3402.50,
            transactions: 142,
            itemsSold: 450
        });
        setLastOrder(null);
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
            salesStats,
            processPayment,
            resetDemo,
            lastOrder
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
