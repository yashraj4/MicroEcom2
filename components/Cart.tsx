import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  removeFromCart: (id: string) => void;
  checkout: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, removeFromCart, checkout }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      checkout();
      setIsProcessing(false);
      onClose();
    }, 2000); // Simulate processing time
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      <div className={`absolute inset-y-0 right-0 max-w-full flex transition-transform duration-500 sm:pl-10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <ShoppingBag className="h-6 w-6 mr-2 text-emerald-600" />
                  Shopping Cart
                </h2>
                <button
                  type="button"
                  className="-m-2 p-2 text-slate-400 hover:text-slate-500"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-slate-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="h-8 w-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 text-lg">Your cart is empty.</p>
                    <button onClick={onClose} className="mt-4 text-emerald-600 font-medium hover:text-emerald-500">
                      Continue Shopping &rarr;
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-200">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-slate-900">
                              <h3 className="line-clamp-1 mr-4">{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-slate-500">Qty {item.quantity}</p>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-red-600 hover:text-red-500 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="border-t border-slate-200 py-6 px-4 sm:px-6 bg-slate-50">
                <div className="flex justify-between text-base font-medium text-slate-900 mb-4">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full flex items-center justify-center rounded-xl border border-transparent bg-emerald-600 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-emerald-700 transition-all ${isProcessing ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {isProcessing ? (
                     <>
                        <CreditCard className="animate-pulse mr-2" />
                        Processing Payment...
                     </>
                  ) : (
                     <>
                        Checkout
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};