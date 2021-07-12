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

export interface Category {
  name: string;
  image: string;
  id: string;
}
