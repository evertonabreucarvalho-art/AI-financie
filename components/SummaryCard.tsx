import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  colorClass: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, colorClass }) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1">
      <h2 className="text-sm font-medium text-gray-400">{title}</h2>
      <p className={`text-2xl font-bold ${colorClass}`}>{formattedAmount}</p>
    </div>
  );
};

export default SummaryCard;
