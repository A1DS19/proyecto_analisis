export type SINPE = 'SINPE';
export type TIENDA_FISICA = 'TIENDA_FISICA';

export interface Address {
  provincia: string;
  canton: string;
  distrito: string;
  direccionExacta: string;
}

export interface Order {
  userId: string;
  productIds: string[];
  total: number;
  paymentMethod: SINPE | TIENDA_FISICA;
  storePickup: string;
  address?: Address | null;
}
