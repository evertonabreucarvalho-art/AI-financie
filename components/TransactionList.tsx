import React from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  title: string;
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ title, transactions, onDelete }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg flex-1 min-h-[300px]">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">{title}</h3>
      {transactions.length > 0 ? (
        <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {transactions.map(t => (
            <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-8">Nenhuma transação registrada.</p>
      )}
    </div>
  );
};

export default TransactionList;
