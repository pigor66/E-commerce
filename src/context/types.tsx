
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface CartContextProps {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (itemId: number) => void;
    clearCart: () => void;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
}


const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeItem = (itemId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ items: cartItems, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};