import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    onAddTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date(date).toISOString(),
    });

    setDescription('');
    setAmount('');
    setCategory('');
  };

  const expenseCategories = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Outros'];
  const incomeCategories = ['Salário', 'Freelance', 'Investimentos', 'Outros'];

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-xl mb-8">
      <h2 className="text-xl font-bold mb-4">Adicionar Nova Transação</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
          <select
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value as TransactionType);
              setCategory(''); // Reset category on type change
            }}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value={TransactionType.EXPENSE}>Saída</option>
            <option value={TransactionType.INCOME}>Entrada</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Descrição</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Compras no mercado"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-1">Valor (R$)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="150.00"
            step="0.01"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Categoria</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="" disabled>Selecione...</option>
            {(type === TransactionType.EXPENSE ? expenseCategories : incomeCategories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">Data</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        
        <button type="submit" className="col-span-1 md:col-span-2 lg:col-span-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition-colors w-full mt-4 md:mt-0">
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
