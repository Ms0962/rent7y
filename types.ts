
export enum Category {
  TOOLS = 'Tools',
  ELECTRONICS = 'Electronics',
  OUTDOOR = 'Outdoor',
  PARTY = 'Party',
  SPORTS = 'Sports',
  PHOTOGRAPHY = 'Photography'
}

export interface RentalItem {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  category: Category;
  imageUrl: string;
  owner: string;
  location: string;
  status: 'active' | 'archived';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type ViewMode = 'marketplace' | 'admin';
