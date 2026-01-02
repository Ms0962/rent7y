
import React, { useState } from 'react';
import { Category, RentalItem } from '../types';
import { generateListingDescription } from '../services/geminiService';

interface ListingFormProps {
  onClose: () => void;
  onSubmit: (item: Omit<RentalItem, 'id' | 'owner' | 'location'>) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerDay: 10,
    category: Category.TOOLS,
    imageUrl: 'https://picsum.photos/seed/' + Math.random() + '/800/600'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleMagicFill = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    try {
      const result = await generateListingDescription(formData.name);
      setFormData({
        ...formData,
        description: result.description,
        pricePerDay: result.suggestedPrice
      });
      setStep(2);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
          <h3 className="text-xl font-bold">List an Item</h3>
          <button onClick={onClose} className="hover:opacity-70"><i className="fa-solid fa-xmark"></i></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">What are you renting?</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Electric Power Drill"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="button"
                  onClick={handleMagicFill}
                  disabled={!formData.name || isGenerating}
                  className="w-full bg-indigo-50 text-indigo-600 border border-indigo-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                >
                  {isGenerating ? (
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                  ) : (
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  )}
                  Auto-generate Description & Price
                </button>
                <p className="text-[10px] text-slate-400 mt-2 text-center uppercase tracking-widest">Powered by Gemini AI</p>
              </div>

              <button 
                type="button"
                onClick={() => setStep(2)}
                className="w-full text-slate-500 text-sm font-medium hover:underline"
              >
                Skip to manual entry
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Daily Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input 
                    type="number" 
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({...formData, pricePerDay: parseInt(e.target.value)})}
                    className="w-full bg-slate-100 border-none rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ListingForm;
