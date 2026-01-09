import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoreFront } from './components/StoreFront';
import { AdminDashboard } from './components/AdminDashboard';
import { Cart } from './components/Cart';
import { Product, CartItem, Order } from './types';
import { CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Simulate persistent cart fetch from "Cart Service"
  useEffect(() => {
    // In a real app, this would be an API call
    console.log("Connecting to Cart Microservice...");
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const showNotification = (message: string, type: 'success' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCheckout = () => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user_123',
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: 'processing',
      date: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    showNotification('Order placed successfully! Notification sent.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        currentPage={currentPage}
        setPage={setCurrentPage}
        toggleCart={() => setCartOpen(true)}
      />

      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-bounce-in">
          <div className="bg-emerald-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
             <CheckCircle className="h-5 w-5 text-green-400" />
             <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <Cart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems} 
        removeFromCart={removeFromCart}
        checkout={handleCheckout}
      />

      <main className="pb-12">
        {currentPage === 'home' && (
          <StoreFront addToCart={addToCart} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard />
        )}

        {currentPage === 'orders' && (
           <div className="max-w-4xl mx-auto px-4 py-8">
             <h1 className="text-3xl font-bold text-slate-900 mb-8">Order History</h1>
             {orders.length === 0 ? (
               <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                 <p className="text-slate-500">No orders found. Start shopping!</p>
               </div>
             ) : (
               <div className="space-y-6">
                 {orders.map(order => (
                   <div key={order.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                     <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                       <div>
                         <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">Order ID</p>
                         <p className="text-sm font-mono text-slate-700">#{order.id}</p>
                       </div>
                       <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {order.status}
                          </span>
                       </div>
                     </div>
                     <div className="p-6">
                       <ul className="space-y-3">
                         {order.items.map(item => (
                           <li key={item.id} className="flex justify-between text-sm text-slate-600">
                             <span>{item.quantity}x {item.name}</span>
                             <span className="font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                           </li>
                         ))}
                       </ul>
                       <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                         <span className="font-semibold text-slate-900">Total Paid</span>
                         <span className="text-xl font-bold text-emerald-600">${order.total.toFixed(2)}</span>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
        )}
      </main>
    </div>
  );
};

export default App;