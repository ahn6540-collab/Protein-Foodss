export interface Product {
  id: number;
  name: string;
  mall: string;
  pricePerPack: number;
  pricePer100g: number;
  weightPerPack: number;
  protein: number;
  carb: number;
  fat: number;
  sugar: number;
  calorie: number;
  imageUrl: string;
  detailUrl: string;
  isSponsored: boolean;
}

export type SortOption = 'VIEWS_DESC' | 'PRICE_ASC' | 'SALES_DESC' | 'PROTEIN_DESC';

export interface FilterState {
  category: string;
  minProtein: number;
  maxProtein: number;
  minCarb: number;
  maxCarb: number;
  minFat: number;
  maxFat: number;
  minSugar: number;
  maxSugar: number;
  minCalorie: number;
  maxCalorie: number;
}