
import { Category, RentalItem } from './types';

export const MOCK_ITEMS: RentalItem[] = [
  {
    id: '1',
    name: 'Professional DSLR Camera Kit',
    description: 'Canon EOS R5 with 24-70mm f/2.8 lens. Perfect for high-end photography and video production.',
    pricePerDay: 85,
    category: Category.PHOTOGRAPHY,
    imageUrl: 'https://picsum.photos/seed/camera1/800/600',
    owner: 'Alex Smith',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Power Drill Set',
    description: 'Heavy duty 18V cordless drill with 2 batteries and a set of bits. Great for home renovation.',
    pricePerDay: 20,
    category: Category.TOOLS,
    imageUrl: 'https://picsum.photos/seed/drill1/800/600',
    owner: 'Sarah Johnson',
    location: 'Oakland, CA'
  },
  {
    id: '3',
    name: '4-Person Camping Tent',
    description: 'Easy-setup weatherproof tent. Includes a carrying bag and stakes.',
    pricePerDay: 15,
    category: Category.OUTDOOR,
    imageUrl: 'https://picsum.photos/seed/tent1/800/600',
    owner: 'Mike Miller',
    location: 'Berkeley, CA'
  },
  {
    id: '4',
    name: 'Electric Guitar & Amp',
    description: 'Fender Stratocaster with a 20W practice amp. Perfect for weekends or parties.',
    pricePerDay: 40,
    category: Category.ELECTRONICS,
    imageUrl: 'https://picsum.photos/seed/guitar1/800/600',
    owner: 'David Chen',
    location: 'San Francisco, CA'
  },
  {
    id: '5',
    name: 'Inflatable Paddle Board',
    description: 'Includes pump, paddle, and carry bag. Lightweight and easy to transport.',
    pricePerDay: 35,
    category: Category.SPORTS,
    imageUrl: 'https://picsum.photos/seed/paddle/800/600',
    owner: 'Elena Ruiz',
    location: 'Sausalito, CA'
  },
  {
    id: '6',
    name: 'Professional Espresso Machine',
    description: 'High-end Breville Barista Express. Make cafe-quality coffee at home.',
    pricePerDay: 30,
    category: Category.ELECTRONICS,
    imageUrl: 'https://picsum.photos/seed/coffee/800/600',
    owner: 'Klaus Schmidt',
    location: 'Palo Alto, CA'
  }
];
