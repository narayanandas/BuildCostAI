export enum MaterialCategory {
  Structure = 'Structure',
  Finishing = 'Finishing',
  Systems = 'Systems',
  Labor = 'Labor'
}

export enum QualityGrade {
  Budget = 'Budget',
  Standard = 'Standard',
  Premium = 'Premium',
  Luxury = 'Luxury'
}

export interface MaterialItem {
  id: string;
  name: string;
  category: MaterialCategory;
  unit: string;
  baseQuantityPerSqFt: number; // Factor to multiply with area
  baseRate: number; // Price per unit
  description: string;
  color: string; // Hex color for charts
  image: string; // URL for the visual representation
}

export interface EstimateItem extends MaterialItem {
  calculatedQuantity: number;
  calculatedCost: number;
  effectiveRate: number; // The actual rate used for calculation (base or custom)
  selected: boolean;
}

export interface AIAnalysisResult {
  summary: string;
  savingsTips: string[];
  risks: string[];
}