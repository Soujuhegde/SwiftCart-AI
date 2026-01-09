"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

interface DataPoint {
    name: string;
    value: number;
}

const API_URL = 'http://localhost:5001';
const socket = io(API_URL);

const Dashboard = () => {
    const [data, setData] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/dashboard/stats`);

                // Update chart data if backend provides it, otherwise keep mock for chart or process it
                if (res.data.chartData) {
                    setData(res.data.chartData);
                }

                setApiData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        socket.on('dashboard_update', () => {
            fetchData();
        });

        return () => {
            socket.off('dashboard_update');
        };
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
