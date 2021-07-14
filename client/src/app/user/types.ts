export type SINPE = 'SINPE';
export type TIENDA_FISICA = 'TIENDA_FISICA';

export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  idNumber: string;
  admin: boolean;
  createdAt: Date;
}

export interface AuthResponse {
  user: User | null;
  isAuth: boolean;
}

export interface Address {
  provincia: string;
  canton: string;
  distrito: string;
  direccionExacta: string;
}

export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  total: number;
  paymentMethod: SINPE | TIENDA_FISICA;
  storePickup: string;
  address?: Address | null;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}
