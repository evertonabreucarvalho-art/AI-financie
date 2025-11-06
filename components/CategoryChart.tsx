import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction, TransactionType } from '../types';

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1967'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
      return (
        <div className="bg-gray-700 p-2 border border-gray-600 rounded-md">
          <p className="text-white">{`${name} : ${formattedValue}`}</p>
        </div>
      );
    }
    return null;
  };

const CategoryChart: React.FC<CategoryChartProps> = ({ transactions }) => {
  const expenseData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE);
    if (expenses.length === 0) return [];
    
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (expenseData.length === 0) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-xl text-center">
        <h3 className="text-xl font-bold mb-4">Análise de Saídas</h3>
        <p className="text-gray-500 mt-8">Adicione algumas saídas para ver a análise por categoria.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-bold mb-4 text-center">Análise de Saídas</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
