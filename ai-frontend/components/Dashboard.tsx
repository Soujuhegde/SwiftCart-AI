"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

interface DataPoint {
    name: string;
    value: number;
}

const Dashboard = () => {
    const [data, setData] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState<any>(null);

    useEffect(() => {
        // Mock API call simulation
        const fetchData = async () => {
            try {
                // Simulating an API call with axios
                // In a real scenario, this would be: const response = await axios.get('/api/data');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

                const mockChartData = [
                    { name: 'Jan', value: 400 },
                    { name: 'Feb', value: 300 },
                    { name: 'Mar', value: 600 },
                    { name: 'Apr', value: 800 },
                    { name: 'May', value: 500 },
                    { name: 'Jun', value: 700 },
                ];

                const mockApiRes = { message: "Data fetched successfully via Axios (Mock)", status: 200 };

                setData(mockChartData);
                setApiData(mockApiRes);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Analytics Dashboard</h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Performance Trends</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">API Status</h3>
                        <div className="text-sm font-mono text-gray-600">
                            {apiData ? (
                                <pre>{JSON.stringify(apiData, null, 2)}</pre>
                            ) : (
                                "No data"
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
