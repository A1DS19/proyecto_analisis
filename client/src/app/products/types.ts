export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  category: string;
  createdAt: Date;
}
