
import React, { useState, useEffect } from 'react';
import { RentalItem, Category } from '../types';
import { generateAdminInsights } from '../services/geminiService';

interface AdminPanelProps {
  items: RentalItem[];
  onArchiveItem: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ items, onArchiveItem }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listings' | 'insights'>('dashboard');
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = {
    totalListings: items.length,
    activeRentals: Math.floor(items.length * 0.6),
    revenue: items.reduce((acc, curr) => acc + curr.pricePerDay, 0) * 12,
    newUsers: 142
  };

  const handleGetInsights = async () => {
    setIsGenerating(true);
    try {
      const data = await generateAdminInsights(items);
      setAiInsights(data.insights);
    } catch (err) {
      console.error("Failed to get insights", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 flex-shrink-0">
        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'listings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-list-check"></i> Manage Listings
          </button>
          <button 
            onClick={() => setActiveTab('insights')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'insights' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> AI Insights
          </button>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 space-y-8">
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Platform Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard label="Total Listings" value={stats.totalListings} icon="fa-box" color="bg-blue-500" trend="+12%" />
              <StatCard label="Active Rentals" value={stats.activeRentals} icon="fa-clock" color="bg-orange-500" trend="+5%" />
              <StatCard label="Est. Revenue" value={`$${stats.revenue.toLocaleString()}`} icon="fa-dollar-sign" color="bg-green-500" trend="+18%" />
              <StatCard label="New Users" value={stats.newUsers} icon="fa-users" color="bg-purple-500" trend="+24%" />
            </div>

            <div className="mt-10 bg-white p-6 rounded-3xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Category Distribution</h3>
              <div className="space-y-4">
                {Object.values(Category).map(cat => {
                  const count = items.filter(i => i.category === cat).length;
                  const percentage = (count / items.length) * 100;
                  return (
                    <div key={cat} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-600">{cat}</span>
                        <span className="text-slate-400">{count} items</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-800">Inventory Management</h2>
              <div className="flex gap-2">
                <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200">Export CSV</button>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <div className="font-bold text-slate-800">{item.name}</div>
                              <div className="text-xs text-slate-400">{item.owner}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-800">${item.pricePerDay}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                            item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => onArchiveItem(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-2"
                            title="Archive Item"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white mb-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-black mb-4">Platform Intelligence</h2>
                <p className="opacity-80 mb-6">Let Gemini analyze your marketplace inventory to discover growth opportunities and inventory gaps.</p>
                <button 
                  onClick={handleGetInsights}
                  disabled={isGenerating}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-black shadow-xl shadow-indigo-900/20 flex items-center gap-2 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isGenerating ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-sparkles"></i>}
                  {aiInsights.length > 0 ? 'Refresh Insights' : 'Generate Market Insights'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiInsights.length > 0 ? (
                aiInsights.map((insight, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <i className={`fa-solid ${idx === 0 ? 'fa-chart-pie' : idx === 1 ? 'fa-bullseye' : 'fa-lightbulb'}`}></i>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                        insight.impact === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">{insight.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{insight.content}</p>
                  </div>
                ))
              ) : (
                !isGenerating && (
                  <div className="col-span-full py-12 text-center text-slate-400">
                    <i className="fa-solid fa-wand-magic-sparkles text-4xl mb-4 opacity-20"></i>
                    <p>Click generate to see AI-powered suggestions for your platform.</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/10`}>
        <i className={`fa-solid ${icon} text-xl`}></i>
      </div>
      <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">{trend}</span>
    </div>
    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</div>
    <div className="text-2xl font-black text-slate-800">{value}</div>
  </div>
);

export default AdminPanel;
