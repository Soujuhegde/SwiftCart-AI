
"use client";

import React, { useState } from "react";
import { useDemo } from "@/providers/DemoProvider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner"; // If sonner isn't installed, we'll mimic or use window.alert or log
import { Play, RotateCcw, ShoppingCart, CreditCard, Box } from "lucide-react";

export default function DemoControlPage() {
    const { addToCart, inventory, processPayment, resetDemo } = useDemo();
    const [activeTab, setActiveTab] = useState("customer");

    const handleSimulateAdd = () => {
        const randomProduct = inventory[Math.floor(Math.random() * inventory.length)];
        addToCart(randomProduct);
        toast.success(`Added ${randomProduct.name} to cart`);
    };

    const handleReset = () => {
        resetDemo();
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 flex flex-col items-center">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Demo Controller</h1>
                    <p className="text-slate-500">Simulate interactions across the SwiftCart AI ecosystem.</p>
                </div>

                <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
                    <CardHeader>
                        <CardTitle>Simulation Studio</CardTitle>
                        <CardDescription>Trigger events to see real-time updates in other windows.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="customer" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="customer">Customer Actions</TabsTrigger>
                                <TabsTrigger value="retailer">Retailer Events</TabsTrigger>
                            </TabsList>

                            <TabsContent value="customer" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        className="h-24 flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                                        variant="outline"
                                        onClick={handleSimulateAdd}
                                    >
                                        <ShoppingCart size={24} />
                                        <span className="font-bold">Add Item to Cart</span>
                                        <span className="text-xs font-normal opacity-70">Random Product</span>
                                    </Button>
                                    <Button
                                        className="h-24 flex flex-col items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                        variant="outline"
                                        onClick={processPayment}
                                    >
                                        <CreditCard size={24} />
                                        <span className="font-bold">Complete Checkout</span>
                                        <span className="text-xs font-normal opacity-70">Process Payment</span>
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="retailer" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        className="h-24 flex flex-col items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                                        variant="outline"
                                    >
                                        <Box size={24} />
                                        <span className="font-bold">Restock Inventory</span>
                                        <span className="text-xs font-normal opacity-70">+20 Units All</span>
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="destructive" className="w-full gap-2" onClick={handleReset}>
                                <RotateCcw size={16} />
                                Reset Full Demo State
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
