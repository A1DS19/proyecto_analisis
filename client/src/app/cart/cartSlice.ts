import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './types';

export interface CartState {
  products: CartItem[] | [];
}

const initialState: CartState = {
  products: [],
};

export interface addCartActionInput {
  product: CartItem;
}

//UPDATE QUANTITY INDIVIDUAL

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart(state) {
      const initializeCart: CartState = {
        products: [],
      };
      const { products } =
        JSON.parse(localStorage.getItem('cart') as string) || initializeCart;
      state.products = products;
    },
    removeCartItem(state, action: PayloadAction<{ id: string }>) {
      const updatedCart = state.products.filter((item) => item.id !== action.payload.id);
      state.products = updatedCart;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    //actualizar cantidad de item cuando esta en el carrito
    updateQuantity(state, action: PayloadAction<{ product: CartItem }>) {
      state.products.forEach((product) => {
        if (product.id === action.payload.product.id) {
          product.selectedQuantity = action.payload.product.selectedQuantity;
        }
      });
      localStorage.setItem('cart', JSON.stringify(state));
    },
    addCartItem(state, action: PayloadAction<addCartActionInput>) {
      //si el item ya esta en el carrito
      const existingItem = state.products.find(
        (item) => item.id === action.payload.product.id
      );

      //si el item ya existe en carrito y si, se agrega otro con
      //diferente cantidad
      const existingItemDiffSelectedQuantity = () => {
        if (existingItem) {
          if (
            !!state.products.find(
              (item) => item.selectedQuantity !== action.payload.product.selectedQuantity
            )
          ) {
            return true;
          }
        }
        return false;
      };

      //Si el item ya existe y se agrega uno igual con diferente cantidad entonces
      //se reemplaza el item por el actualizado con nueva cantidad
      if (existingItemDiffSelectedQuantity()) {
        const filteredItemsWOExisting = state.products.filter(
          (item) => item.id !== action.payload.product.id
        );

        const newCart = [...filteredItemsWOExisting, action.payload.product];
        (state as any).products = newCart;
      }

      //si item no existe en carrito agrega uno nuevo
      if (!existingItem) {
        (state as any).products.push(action.payload.product);
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
  extraReducers: {},
});

export const { addCartItem, initializeCart, removeCartItem, updateQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
