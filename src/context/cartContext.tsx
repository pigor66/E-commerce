// cartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'CLEAR_CART' };

type CartDispatch = Dispatch<CartAction>;

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<CartDispatch | undefined>(undefined);

type CartProviderProps = { children: ReactNode };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item.product.id === action.payload.product.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;

        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, { product: action.payload.product, quantity: 1 }] };
      }

    case 'REMOVE_FROM_CART':
      const updatedItems = state.items.filter(item => item.product.id !== action.payload.productId);
      return { ...state, items: updatedItems };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

const useCartState = (): CartState => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return context;
};

const useCartDispatch = (): CartDispatch => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCartState, useCartDispatch };
