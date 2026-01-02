
import React, { useState, useMemo } from 'react';
import { Category, RentalItem } from './types';
import { MOCK_ITEMS } from './constants';
import Header from './components/Header';
import ListingCard from './components/ListingCard';
import AIChat from './components/AIChat';
import ListingForm from './components/ListingForm';

const App: React.FC = () => {
  const [items, setItems] = useState<RentalItem[]>(MOCK_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleAddItem = (newItem: Omit<RentalItem, 'id' | 'owner' | 'location'>) => {
    const item: RentalItem = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      owner: 'Guest User',
      location: 'San Francisco, CA'
    };
    setItems([item, ...items]);
    setIsListingModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header 
        onSearchChange={setSearchQuery} 
        onListClick={() => setIsListingModalOpen(true)}
      />

      <main className="container mx-auto px-4 pt-24">
        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'All' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Items
          </button>
          {Object.values(Category).map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section (Search Results or Welcome) */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-700">
              Showing results for "<span className="text-indigo-600">{searchQuery}</span>"
            </h2>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ListingCard 
              key={item.id} 
              item={item} 
              onClick={(it) => setSelectedItem(it)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <i className="fa-solid fa-box-open text-6xl mb-4 opacity-20"></i>
            <p className="text-lg">No items found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-indigo-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 h-80 md:h-auto relative">
                <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              </div>
              <div className="p-8 md:w-1/2 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedItem.category}</span>
                    <h2 className="text-3xl font-black text-slate-800 mt-1">{selectedItem.name}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-indigo-600">${selectedItem.pricePerDay}</span>
                    <span className="text-slate-400 text-sm block">/ day</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{selectedItem.owner}</p>
                    <p className="text-xs text-slate-500 flex items-center">
                      <i className="fa-solid fa-star text-yellow-400 mr-1"></i> 4.9 (24 reviews)
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Description</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedItem.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-indigo-600"></i>
                      {selectedItem.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-shield-check text-green-600"></i>
                      Verified Item
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex gap-4">
                  <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
                    Request to Rent
                  </button>
                  <button className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-colors">
                    <i className="fa-regular fa-comment text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listing Modal */}
      {isListingModalOpen && (
        <ListingForm 
          onClose={() => setIsListingModalOpen(false)} 
          onSubmit={handleAddItem}
        />
      )}

      <AIChat />
    </div>
  );
};

export default App;
