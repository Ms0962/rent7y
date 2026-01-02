
import React from 'react';

interface HeaderProps {
  onSearchChange: (val: string) => void;
  onListClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, onListClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-slate-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <i className="fa-solid fa-arrows-rotate text-xl"></i>
          </div>
          <span className="text-2xl font-black text-slate-800 hidden sm:block">RentAll</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search for tools, gear, anything..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={onListClick}
            className="hidden md:flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <i className="fa-solid fa-plus"></i>
            List Item
          </button>
          
          <button className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50">
            <i className="fa-solid fa-user"></i>
          </button>

          {/* Mobile Plus Button */}
          <button 
            onClick={onListClick}
            className="md:hidden w-11 h-11 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
