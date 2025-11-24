export interface Product {
  id: number;
  name: string;
  mall: '쿠팡' | '랭킹닭컴' | '네이버스토어';
  pricePerPack: number;
  pricePer100g: number;
  weightPerPack: number;
  protein: number;
  calorie: number;
  sugar: number;
  imageUrl: string;
  detailUrl: string;
  isSponsored: boolean;
}

export type SortOption = 'PRICE_ASC' | 'PRICE_DESC' | 'PROTEIN_DESC' | 'CALORIE_ASC';

export interface FilterState {
  minProtein: number;
  maxCalorie: number;
  maxSugar: number;
  minPrice: number;
  maxPrice: number;
  maxPricePer100g: number;
  selectedMalls: string[];
}