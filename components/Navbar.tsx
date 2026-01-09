import React from 'react';
import { ShoppingCart, Server, Home, Package, Layers, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  currentPage: string;
  setPage: (page: string) => void;
  toggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentPage, setPage, toggleCart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div 
            className="flex items-center cursor-pointer group transition-all duration-200" 
            onClick={() => setPage('home')}
          >
            <div className="bg-emerald-600 p-1.5 rounded-lg mr-2 group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
              MicroEcom
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setPage('home')}
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'}`}
            >
              <Home className="h-4 w-4 mr-1.5" />
              Store
            </button>
            <button 
              onClick={() => setPage('admin')}
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'admin' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'}`}
            >
              <Server className="h-4 w-4 mr-1.5" />
              Infrastructure
            </button>
            <button 
              onClick={() => setPage('orders')}
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'orders' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'}`}
            >
              <Package className="h-4 w-4 mr-1.5" />
              Orders
            </button>
          </div>

          <div className="flex items-center space-x-4">
             <div className="relative hidden sm:block text-slate-400 focus-within:text-slate-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  name="search"
                  id="search"
                  className="block w-full rounded-full border-0 bg-slate-100 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-transparent placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 transition-all"
                  placeholder="Search products..."
                />
              </div>

            <button 
              onClick={toggleCart}
              className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};