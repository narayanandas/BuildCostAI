import { MaterialCategory, MaterialItem, QualityGrade } from './types';
import { 
  BrickWall, 
  PaintBucket, 
  Hammer, 
  Zap, 
  Droplets, 
  Component, 
  Grid3X3, 
  Waves,
  HardHat,
  DoorOpen
} from 'lucide-react';
import React from 'react';

export const CURRENCY_SYMBOL = '₹';

export const MATERIALS_DB: MaterialItem[] = [
  {
    id: 'cement',
    name: 'Cement',
    category: MaterialCategory.Structure,
    unit: 'Bags',
    baseQuantityPerSqFt: 0.45,
    baseRate: 420, // Approx INR per bag
    description: 'High-grade PPC/OPC cement for foundation, slab, and masonry work.',
    color: '#94a3b8', // Slate 400
    image: 'https://plus.unsplash.com/premium_photo-1682366278687-f1bba8c2a210?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'steel',
    name: 'Steel Reinforcement',
    category: MaterialCategory.Structure,
    unit: 'kg',
    baseQuantityPerSqFt: 4.0,
    baseRate: 75, // Approx INR per kg
    description: 'Fe550 TMT bars for superior structural strength and flexibility.',
    color: '#475569', // Slate 600
    image: 'https://plus.unsplash.com/premium_photo-1677172321949-a2f6ef6e6ed9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'bricks',
    name: 'Bricks / Blocks',
    category: MaterialCategory.Structure,
    unit: 'Pcs',
    baseQuantityPerSqFt: 12.5,
    baseRate: 10, // Approx INR per piece
    description: 'Premium red clay bricks or AAC blocks for thermal insulation.',
    color: '#ef4444', // Red 500
    image: 'https://images.unsplash.com/photo-1629608444154-6d052691632f?q=80&w=439&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'sand',
    name: 'Sand & Aggregate',
    category: MaterialCategory.Structure,
    unit: 'cft',
    baseQuantityPerSqFt: 2.5,
    baseRate: 65, // Approx INR per cft
    description: 'River sand and 20mm aggregate for concrete mixing.',
    color: '#d97706', // Amber 600
    image: 'https://images.unsplash.com/photo-1621262372714-358071852028?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'flooring',
    name: 'Tiles & Flooring',
    category: MaterialCategory.Finishing,
    unit: 'sq.ft',
    baseQuantityPerSqFt: 1.3,
    baseRate: 90, // Approx INR per sqft (material)
    description: 'Double-charged vitrified tiles or granite/marble flooring.',
    color: '#0ea5e9', // Sky 500
    image: 'https://plus.unsplash.com/premium_photo-1682088053289-cb286ef69a99?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'paint',
    name: 'Paint & Putty',
    category: MaterialCategory.Finishing,
    unit: 'Liters',
    baseQuantityPerSqFt: 0.18,
    baseRate: 350, // Approx INR per liter (premium emulsion)
    description: 'Interior and exterior weather-proof emulsion with 2 coats of putty.',
    color: '#a855f7', // Purple 500
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'wood',
    name: 'Wood & Carpentry',
    category: MaterialCategory.Finishing,
    unit: 'Lump Sum',
    baseQuantityPerSqFt: 1, // Scaled factor
    baseRate: 150, // Cost factor per sqft area
    description: 'Teak wood main door, Sal wood frames, and flush doors.',
    color: '#854d0e', // Yellow 800
    image: 'https://plus.unsplash.com/premium_photo-1664300494539-313eac2a6095?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'electrical',
    name: 'Electrical Works',
    category: MaterialCategory.Systems,
    unit: 'Lump Sum',
    baseQuantityPerSqFt: 1,
    baseRate: 130, // Cost factor per sqft
    description: 'Fire-resistant wiring, modular switches, and distribution boards.',
    color: '#eab308', // Yellow 500
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'plumbing',
    name: 'Plumbing Works',
    category: MaterialCategory.Systems,
    unit: 'Lump Sum',
    baseQuantityPerSqFt: 1,
    baseRate: 100, // Cost factor per sqft
    description: 'CPVC/UPVC pipes, water tanks, and sanitary fixtures.',
    color: '#06b6d4', // Cyan 500
    image: 'https://plus.unsplash.com/premium_photo-1664301972519-506636f0245d?q=80&w=896&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'labor',
    name: 'Labor Charges',
    category: MaterialCategory.Labor,
    unit: 'sq.ft',
    baseQuantityPerSqFt: 1,
    baseRate: 550, // Approx INR per sqft built-up for labor contract
    description: 'Skilled masons, helpers, bar benders, and site supervision.',
    color: '#22c55e', // Green 500
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
  }
];

export const QUALITY_MULTIPLIERS: Record<QualityGrade, number> = {
  [QualityGrade.Budget]: 0.85,
  [QualityGrade.Standard]: 1.0,
  [QualityGrade.Premium]: 1.45,
  [QualityGrade.Luxury]: 1.9
};

export const getIconForId = (id: string, className?: string) => {
  const props = { className: className || "w-5 h-5" };
  switch(id) {
    case 'cement': return <Component {...props} />;
    case 'steel': return <Grid3X3 {...props} />;
    case 'bricks': return <BrickWall {...props} />;
    case 'sand': return <Waves {...props} />;
    case 'flooring': return <Grid3X3 {...props} />;
    case 'paint': return <PaintBucket {...props} />;
    case 'wood': return <DoorOpen {...props} />;
    case 'electrical': return <Zap {...props} />;
    case 'plumbing': return <Droplets {...props} />;
    case 'labor': return <HardHat {...props} />;
    default: return <Hammer {...props} />;
  }
};
