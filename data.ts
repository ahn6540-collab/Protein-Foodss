import { Product } from './types';

const MALLS = ['쿠팡', '랭킹닭컴', '네이버스토어'] as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "헬스도시락 고단백 닭가슴살볼 3종",
    mall: "쿠팡",
    pricePerPack: 5900,
    pricePer100g: 2200,
    weightPerPack: 270,
    protein: 30,
    calorie: 450,
    sugar: 4,
    imageUrl: "https://picsum.photos/200/200?random=1",
    detailUrl: "#",
    isSponsored: false
  },
  {
    id: 2,
    name: "맛있는 곤약볶음밥 & 비프스테이크",
    mall: "랭킹닭컴",
    pricePerPack: 4500,
    pricePer100g: 1800,
    weightPerPack: 250,
    protein: 18,
    calorie: 320,
    sugar: 2,
    imageUrl: "https://picsum.photos/200/200?random=2",
    detailUrl: "#",
    isSponsored: false
  },
  {
    id: 3,
    name: "저염 닭가슴살 큐브 샐러드",
    mall: "네이버스토어",
    pricePerPack: 6200,
    pricePer100g: 3100,
    weightPerPack: 200,
    protein: 25,
    calorie: 280,
    sugar: 1,
    imageUrl: "https://picsum.photos/200/200?random=3",
    detailUrl: "#",
    isSponsored: false
  },
  {
    id: 4,
    name: "포만감 가득 현미밥 도시락",
    mall: "쿠팡",
    pricePerPack: 3900,
    pricePer100g: 1300,
    weightPerPack: 300,
    protein: 12,
    calorie: 380,
    sugar: 5,
    imageUrl: "https://picsum.photos/200/200?random=4",
    detailUrl: "#",
    isSponsored: false
  },
  {
    id: 5,
    name: "프로틴 폭탄 소고기 볼 도시락",
    mall: "랭킹닭컴",
    pricePerPack: 7500,
    pricePer100g: 2500,
    weightPerPack: 300,
    protein: 42,
    calorie: 520,
    sugar: 3,
    imageUrl: "https://picsum.photos/200/200?random=5",
    detailUrl: "#",
    isSponsored: true
  },
  // Generating more dummy data to reach ~20 items
  ...Array.from({ length: 15 }).map((_, i) => {
    const id = i + 6;
    const mall = MALLS[Math.floor(Math.random() * MALLS.length)];
    const weight = 200 + Math.floor(Math.random() * 150); // 200~350g
    const protein = 10 + Math.floor(Math.random() * 35); // 10~45g
    const price = 3500 + Math.floor(Math.random() * 50) * 100; // 3500 ~ 8500
    const price100g = Math.floor(price / (weight / 100));
    
    return {
      id,
      name: `더미 다이어트 도시락 ${id}호`,
      mall,
      pricePerPack: price,
      pricePer100g: price100g,
      weightPerPack: weight,
      protein,
      calorie: 250 + Math.floor(Math.random() * 400), // 250 ~ 650 kcal
      sugar: Math.floor(Math.random() * 10), // 0 ~ 9g
      imageUrl: `https://picsum.photos/200/200?random=${id}`,
      detailUrl: "#",
      isSponsored: Math.random() < 0.1
    } as Product;
  })
];