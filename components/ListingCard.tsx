
import React from 'react';
import { RentalItem } from '../types';

interface ListingCardProps {
  item: RentalItem;
  onClick: (item: RentalItem) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
          ${item.pricePerDay}/day
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">{item.category}</span>
          <span className="text-xs text-slate-400 flex items-center">
            <i className="fa-solid fa-location-dot mr-1"></i> {item.location.split(',')[0]}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mb-2">{item.name}</h3>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <i className="fa-solid fa-user text-xs"></i>
          </div>
          <span className="text-sm text-slate-500">{item.owner}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
