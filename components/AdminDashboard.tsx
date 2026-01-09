import React, { useEffect, useState } from 'react';
import { MicroserviceHealth, ServiceStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Cpu, Database, Globe } from 'lucide-react';

const INITIAL_SERVICES: MicroserviceHealth[] = [
  { name: 'API Gateway', status: ServiceStatus.OPERATIONAL, latency: 45, uptime: 99.99, requestsPerSecond: 1200 },
  { name: 'Auth Service', status: ServiceStatus.OPERATIONAL, latency: 120, uptime: 99.95, requestsPerSecond: 300 },
  { name: 'Product Catalog', status: ServiceStatus.OPERATIONAL, latency: 85, uptime: 99.98, requestsPerSecond: 850 },
  { name: 'Cart Service', status: ServiceStatus.OPERATIONAL, latency: 60, uptime: 99.99, requestsPerSecond: 400 },
  { name: 'Order Service', status: ServiceStatus.DEGRADED, latency: 350, uptime: 99.50, requestsPerSecond: 150 },
  { name: 'Payment Service', status: ServiceStatus.OPERATIONAL, latency: 200, uptime: 99.99, requestsPerSecond: 120 },
  { name: 'Notification Service', status: ServiceStatus.OPERATIONAL, latency: 90, uptime: 99.90, requestsPerSecond: 80 },
];

export const AdminDashboard: React.FC = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [trafficData, setTrafficData] = useState<{ time: string; requests: number }[]>([]);

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setServices(prev => prev.map(s => ({
        ...s,
        latency: Math.max(20, s.latency + (Math.random() * 40 - 20)),
        requestsPerSecond: Math.max(0, s.requestsPerSecond + (Math.random() * 100 - 50)),
        status: Math.random() > 0.95 ? (Math.random() > 0.5 ? ServiceStatus.DEGRADED : ServiceStatus.OPERATIONAL) : s.status
      })));

      setTrafficData(prev => {
        const newData = [...prev, { time: new Date().toLocaleTimeString(), requests: Math.floor(Math.random() * 2000) + 1000 }];
        return newData.slice(-20); // Keep last 20 points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case ServiceStatus.OPERATIONAL: return <CheckCircle className="h-5 w-5 text-green-500" />;
      case ServiceStatus.DEGRADED: return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case ServiceStatus.DOWN: return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Architecture & Health</h1>
          <p className="text-slate-500">Real-time monitoring of microservice clusters.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <div key={service.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Cpu className="h-5 w-5 text-slate-600" />
              </div>
              {getStatusIcon(service.status)}
            </div>
            <h3 className="font-semibold text-slate-900">{service.name}</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Latency</span>
                <span className={`font-mono font-medium ${service.latency > 300 ? 'text-red-500' : 'text-slate-700'}`}>
                  {service.latency.toFixed(0)}ms
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Load</span>
                <span className="font-mono font-medium text-slate-700">{service.requestsPerSecond.toFixed(0)} rps</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div 
                  className={`h-1.5 rounded-full ${service.status === ServiceStatus.OPERATIONAL ? 'bg-green-500' : 'bg-yellow-500'}`} 
                  style={{ width: `${service.uptime - 90}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-emerald-500" />
            Global Traffic Ingress
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
            <Database className="h-5 w-5 mr-2 text-emerald-500" />
            Service Load Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={services} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={100} stroke="#64748b" fontSize={12} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="requestsPerSecond" fill="#34d399" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};