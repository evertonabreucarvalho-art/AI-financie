import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 sticky top-0 z-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-emerald-400">
        AI Financie Abreu
      </h1>
    </header>
  );
};

export default Header;
