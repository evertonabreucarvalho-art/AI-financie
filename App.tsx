import React, { useState, useMemo, useCallback } from 'react';
import { Transaction, TransactionType } from './types';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryChart from './components/CategoryChart';
import { getFinancialTip } from './services/geminiService';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Some initial data for demonstration
    { id: '1', description: 'Salário', amount: 5000, type: TransactionType.INCOME, category: 'Salário', date: new Date().toISOString() },
    { id: '2', description: 'Aluguel', amount: 1500, type: TransactionType.EXPENSE, category: 'Moradia', date: new Date().toISOString() },
    { id: '3', description: 'Supermercado', amount: 600, type: TransactionType.EXPENSE, category: 'Alimentação', date: new Date().toISOString() },
    { id: '4', description: 'Projeto Freelance', amount: 800, type: TransactionType.INCOME, category: 'Freelance', date: new Date().toISOString() },
    { id: '5', description: 'Internet', amount: 100, type: TransactionType.EXPENSE, category: 'Moradia', date: new Date().toISOString() },
  ]);

  const [aiTip, setAiTip] = useState<string>('');
  const [isTipLoading, setIsTipLoading] = useState<boolean>(false);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().getTime().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
  }, [transactions]);

  const incomeTransactions = useMemo(() => 
    transactions.filter(t => t.type === TransactionType.INCOME), 
  [transactions]);
  
  const expenseTransactions = useMemo(() => 
    transactions.filter(t => t.type === TransactionType.EXPENSE), 
  [transactions]);

  const fetchAiTip = useCallback(async () => {
    setIsTipLoading(true);
    setAiTip('');
    const tip = await getFinancialTip(transactions);
    setAiTip(tip);
    setIsTipLoading(false);
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        
        {/* Summary Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard title="Total de Entradas" amount={totalIncome} colorClass="text-green-400" />
          <SummaryCard title="Total de Saídas" amount={totalExpenses} colorClass="text-red-400" />
          <SummaryCard title="Balanço" amount={balance} colorClass={balance >= 0 ? "text-blue-400" : "text-orange-500"} />
        </section>

        {/* Transaction Form */}
        <section>
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </section>

        {/* AI Tip Section */}
        <section className="my-8 bg-gray-800/50 p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-xl font-bold mb-4">Dica Financeira com IA</h3>
            <button
                onClick={fetchAiTip}
                disabled={isTipLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md transition-colors flex items-center justify-center mx-auto disabled:bg-purple-800 disabled:cursor-not-allowed"
            >
                <SparklesIcon />
                {isTipLoading ? 'Analisando...' : 'Gerar Nova Dica'}
            </button>
            {isTipLoading && <p className="mt-4 text-gray-400 animate-pulse">Pensando na melhor dica para você...</p>}
            {aiTip && (
                <div className="mt-4 text-left bg-gray-800 p-4 rounded-md border border-purple-500">
                    <p className="text-purple-300 whitespace-pre-wrap">{aiTip}</p>
                </div>
            )}
        </section>

        {/* Kanban-style lists and chart */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <TransactionList title="Entradas" transactions={incomeTransactions} onDelete={handleDeleteTransaction} />
                <TransactionList title="Saídas" transactions={expenseTransactions} onDelete={handleDeleteTransaction} />
            </div>
            <div className="lg:col-span-1">
                <CategoryChart transactions={transactions} />
            </div>
        </section>
      </main>
      <footer className="text-center p-4 text-gray-600 text-sm">
        <p>Desenvolvido com IA para AI Financie Abreu</p>
      </footer>
    </div>
  );
};

export default App;
