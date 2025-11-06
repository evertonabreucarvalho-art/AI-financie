import React from 'react';
import { Transaction, TransactionType } from '../types';
import { TrashIcon } from './icons';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? 'text-green-400' : 'text-red-400';
  const sign = isIncome ? '+' : '-';
  
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(transaction.amount);

  return (
    <li className="flex items-center justify-between bg-gray-800 p-3 rounded-md mb-2 hover:bg-gray-700/50 transition-colors duration-200">
      <div>
        <p className="font-semibold">{transaction.description}</p>
        <p className="text-xs text-gray-400">{transaction.category} - {new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`font-bold ${amountColor}`}>{sign} {formattedAmount}</span>
        <button onClick={() => onDelete(transaction.id)} className="text-gray-500 hover:text-red-500 transition-colors">
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
