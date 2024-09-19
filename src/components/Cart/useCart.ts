import { atom, useAtom, useAtomValue } from "jotai";
import { ProductType } from "../Product/Product";
import { useEffect, useState } from "react";
import useToken, { decodeToken } from "../Login/UseToken";

export const countAtom = atom<number>(0);
export const cartAtom = atom<ProductType[]>([]);
export const userIdAtom = atom<number | null>(null)

export function useCart() {
    const [cart, setCart] = useAtom(cartAtom);
    const [cartCount, setCartCount] = useAtom(countAtom);
    const {token} = useToken()
    const [userId, setUserId] = useAtom(userIdAtom)

    useEffect(() => {
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setUserId(decodedToken.userId);
            }
        }
    }, [token]);

    useEffect(() => {
        if (userId === null) {
            setCart([]);
            setCartCount(0);
        } else {
            const cartStorageString = localStorage.getItem(`cartProducts_${userId}`);
            if (cartStorageString) {
                const data = JSON.parse(cartStorageString);
                setCart(data);
                setCartCount(
                    data.reduce((total: number, product: ProductType) => total + product.quantity, 0)
                );
           }
        }
    }, [userId]);


    const addToCart = (item: ProductType) => {
        try {
            const cartStorage = localStorage.getItem(`cartProducts_${userId}`);
            let existingCart: ProductType[] = cartStorage ? JSON.parse(cartStorage) : [];
            const productIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
            if (productIndex >= 0) {
                existingCart[productIndex].quantity += 1;
            } else {
                existingCart.push({ ...item, quantity: 1 });
        }
            localStorage.setItem(`cartProducts_${userId}`, JSON.stringify(existingCart));
            setCart(existingCart);
            setCartCount(existingCart.reduce((total: number, product: ProductType) => total + product.quantity, 0));
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        }
    };

    const removeFromCart = (itemId: number) => {
        try {
            const cartStorage = localStorage.getItem(`cartProducts_${userId}`);
            let existingCart: ProductType[] = cartStorage ? JSON.parse(cartStorage) : [];
            const productIndex = cart.findIndex(cartItem => cartItem.id === itemId);
            console.log('here', productIndex)
            if (existingCart[productIndex].quantity > 1){
                existingCart[productIndex].quantity -=1
            } else {
                existingCart = existingCart.filter(item => item.id !== itemId);
            }
            localStorage.setItem(`cartProducts_${userId}`, JSON.stringify(existingCart));
            setCart(existingCart);
            setCartCount(existingCart.reduce((total: number, product: ProductType) => total + product.quantity, 0));
        } catch (error) {
            console.error("Failed to delete item from cart:", error);
        }
    };

    return { cart, cartCount, addToCart, removeFromCart };
}