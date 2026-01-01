"use client";

import React, { useState } from "react";
import { useDemo, type Product } from "@/providers/DemoProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Upload, Filter, MoreHorizontal, AlertTriangle, X, ScanBarcode } from "lucide-react";

export default function InventoryPage() {
    const { inventory, addProduct } = useDemo();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: "",
        category: "",
        sku: "",
        price: 0,
        stock: 0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVAY3wjoo_Az5vpjUOzpf17gLYntHocOyl-F3cacOHwkqx4WgSia4HdU12ZMI1xBV2u4IvC14KAy0hNjEhaTBxyaW56Lasg9_LwQFZQLGSDT2Cl2QkdbbtjSDRbrdGoliNmvNvi4wUAy-COBzczaMLMHkFBzz38BYbpo6diW7wrM8xw4Y8xGk5uJOrfQBlttd2jsGG7VOL4stBJL3EBGUcBEj0f6xOB7UZnJQC4xJS0gofHLUxP0q0KWyv2IZ0sG6kmrSUQ5xgVf5F"
    });

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.price) return;

        const product: Product = {
            id: Math.random().toString(36).substr(2, 9),
            name: newProduct.name || "New Product",
            category: newProduct.category || "General",
            sku: newProduct.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
            price: Number(newProduct.price) || 0,
            stock: Number(newProduct.stock) || 0,
            image: newProduct.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBVAY3wjoo_Az5vpjUOzpf17gLYntHocOyl-F3cacOHwkqx4WgSia4HdU12ZMI1xBV2u4IvC14KAy0hNjEhaTBxyaW56Lasg9_LwQFZQLGSDT2Cl2QkdbbtjSDRbrdGoliNmvNvi4wUAy-COBzczaMLMHkFBzz38BYbpo6diW7wrM8xw4Y8xGk5uJOrfQBlttd2jsGG7VOL4stBJL3EBGUcBEj0f6xOB7UZnJQC4xJS0gofHLUxP0q0KWyv2IZ0sG6kmrSUQ5xgVf5F"
        };

        addProduct(product);
        setIsAddModalOpen(false);
        // Reset form
        setNewProduct({
            name: "",
            category: "",
            sku: "",
            price: 0,
            stock: 0,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVAY3wjoo_Az5vpjUOzpf17gLYntHocOyl-F3cacOHwkqx4WgSia4HdU12ZMI1xBV2u4IvC14KAy0hNjEhaTBxyaW56Lasg9_LwQFZQLGSDT2Cl2QkdbbtjSDRbrdGoliNmvNvi4wUAy-COBzczaMLMHkFBzz38BYbpo6diW7wrM8xw4Y8xGk5uJOrfQBlttd2jsGG7VOL4stBJL3EBGUcBEj0f6xOB7UZnJQC4xJS0gofHLUxP0q0KWyv2IZ0sG6kmrSUQ5xgVf5F"
        });
    };

    return (
        <div className="p-8 space-y-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Inventory Management</h2>
                    <p className="text-slate-500 mt-1">Manage stock levels and product details.</p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 gap-2"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus size={18} />
                    Add Product
                </Button>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input
                            placeholder="Search products by name or SKU..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Filter size={18} />
                            Filters
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Upload size={18} />
                            Import
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock Level</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInventory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-slate-900 dark:text-white">{item.name}</TableCell>
                                <TableCell className="text-slate-500">{item.sku}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span>{item.stock}</span>
                                        {item.stock < 10 && (
                                            <AlertTriangle size={14} className="text-red-500" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {item.stock > 20 ? (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">In Stock</Badge>
                                    ) : item.stock > 0 ? (
                                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Low Stock</Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Out of Stock</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal size={18} className="text-slate-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add New Product</h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)} className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <X size={20} />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Product Name</label>
                                <Input
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                    placeholder="e.g. Organic Apples"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Category</label>
                                <Input
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                    placeholder="e.g. Produce"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Barcode / SKU</label>
                                <div className="relative">
                                    <Input
                                        value={newProduct.sku}
                                        onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })}
                                        placeholder="Scan or enter barcode..."
                                        className="pr-10"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <ScanBarcode size={18} />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1">This code will be used for customer scanning.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Price ($)</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={newProduct.price}
                                        onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">Initial Stock</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={newProduct.stock}
                                        onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAddProduct}>
                                    Save Product
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
