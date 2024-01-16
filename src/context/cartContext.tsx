import React, { createContext, useEffect, useState } from 'react';
import { ProductSelected } from '../hooks/types';
import { notification } from 'antd';

interface CartContextProps {
  cart: ProductSelected[];
  addItemToCart: (item: ProductSelected) => void;
  removeItemToCart: (item: ProductSelected) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export default function CartProvider({ children }: any) {
  const initialCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductSelected[]>(initialCart);
  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function openNotification(title: string, description: string, type: 'success' | 'error' | 'warning') {
    api[type]({
      message: title,
      description: description,
    });
  };

  function addItemToCart(item: ProductSelected) {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item]);
      openNotification('Adicionado ao seu carrinho', `O produto ${item.name} foi adicionado ao carrinho`, 'success')
    } else {
      openNotification('Este produto ja esta no carrinho', `O produto ${item.name} já foi adicionado ao carrinho`, 'warning')
    }
  }

  function removeItemToCart(item: ProductSelected) {
    const itemsFiltered = cart.filter((cartItem: ProductSelected) => item.id !== cartItem.id);
    setCart(itemsFiltered);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemToCart, clearCart }}>
      {contextHolder}
      {children}
    </CartContext.Provider>
  );
}
