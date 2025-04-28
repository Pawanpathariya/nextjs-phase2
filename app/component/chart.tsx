'use client';
import { getSales } from '../actions/getSales';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface SalesData {
  date: string;
  amount: number;
}

export default function SalesChart() {
  const [sales, setSales] = useState<SalesData[]>([]);

  useEffect(() => {
    async function loadSales() {
      const data = await getSales();
      setSales(data);
    }
    loadSales();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📈 Sales Overview</h2>
      <ResponsiveContainer width={900} height={400}>
        <LineChart data={sales}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}
            labelStyle={{ color: '#475569' }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#6366f1" 
            strokeWidth={3}
            dot={{ r: 4, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

