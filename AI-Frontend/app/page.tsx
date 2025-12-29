"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export default function Home() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock API call to demonstrate Axios integration
  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulating an API call with a timeout
      // In a real app, this would be: await axios.get('/api/data');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockData = [
        { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
      ];
      
      // Axios usage example (commented out as we don't have a real endpoint yet)
      // const response = await axios.get('https://example.com/api');
      // console.log(response.data);

      setData(mockData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <main className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
              AI-Frontend Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Next.js 15 • Tailwind CSS • Axios • Recharts
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg active:scale-95 transform duration-150"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </header>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px]">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Analytics Overview
          </h2>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#f3f4f6" }}
                  itemStyle={{ color: "#d1d5db" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  name="Page Views"
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Unique Visitors"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
             <div className="flex items-center justify-center h-full text-gray-400">
                Loading Chart Data...
             </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <h3 className="text-lg font-medium mb-2 text-gray-600">Total Users</h3>
              <p className="text-4xl font-bold text-gray-900">12,345</p>
              <div className="text-sm text-green-500 mt-2 flex items-center gap-1">
                 ↑ 12% from last month
              </div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <h3 className="text-lg font-medium mb-2 text-gray-600">Active Sessions</h3>
              <p className="text-4xl font-bold text-gray-900">843</p>
              <div className="text-sm text-blue-500 mt-2 flex items-center gap-1">
                 ● Live now
              </div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <h3 className="text-lg font-medium mb-2 text-gray-600">Conversion Rate</h3>
              <p className="text-4xl font-bold text-gray-900">2.4%</p>
               <div className="text-sm text-red-500 mt-2 flex items-center gap-1">
                 ↓ 0.5% from last week
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
