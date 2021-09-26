export type Image = { url: string; public_id: string };

export interface Product {
  id: string;
  name: string;
  description: string;
  images: [Image];
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
