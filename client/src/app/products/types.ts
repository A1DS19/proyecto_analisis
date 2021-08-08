export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  isDiscounted: boolean;
  discountedPrice: number;
  price: number;
  category: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
}
