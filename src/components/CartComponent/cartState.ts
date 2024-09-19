import { atom, useAtom } from "jotai";
import { ProductType } from "../Product/Product";
import { getProductsFromCart } from "@/api/serverRequests";
import { useEffect } from "react";

export const countAtom = atom<number>(0);
export const cartAtom = atom<ProductType[]>([]);

export const asyncDataAtom = atom(async () => {
    const response = await getProductsFromCart();
    const data = response.count;
    return data;
});

export function useCart() {
    const [cart, setCart] = useAtom(cartAtom);
    const [cartCount, setCartCount] = useAtom(countAtom);

    useEffect(() => {
        const cartStorageString = localStorage.getItem("cartProducts");
        if (cartStorageString) {
            const data = JSON.parse(cartStorageString);
            setCart(data);
            setCartCount(data.reduce((total: number, product:ProductType) => total + product.quantity, 0));
        }
    }, []);

    const addToCart = (item: ProductType) => {
        try {
            const cartStorage = localStorage.getItem("cartProducts");
            let existingCart: ProductType[] = cartStorage ? JSON.parse(cartStorage) : [];
            const productIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
            if (productIndex >= 0) {
                existingCart[productIndex].quantity += 1;
            } else {
                existingCart.push({ ...item, quantity: 1 });
        }
            localStorage.setItem("cartProducts", JSON.stringify(existingCart));
            setCart(existingCart);
            setCartCount(existingCart.reduce((total: number, product: ProductType) => total + product.quantity, 0));
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        }
    };

    const removeFromCart = (itemId: number) => {
        try {
            const cartStorage = localStorage.getItem("cartProducts");
            let existingCart: ProductType[] = cartStorage ? JSON.parse(cartStorage) : [];
            const productIndex = cart.findIndex(cartItem => cartItem.id === itemId);
            console.log(productIndex)
            if (existingCart[productIndex].quantity > 1){
                existingCart[productIndex].quantity -=1
            } else {
                existingCart = existingCart.filter(item => item.id !== itemId);
            }
            localStorage.setItem("cartProducts", JSON.stringify(existingCart));
            setCart(existingCart);
            setCartCount(existingCart.reduce((total: number, product: ProductType) => total + product.quantity, 0));
        } catch (error) {
            console.error("Failed to delete item from cart:", error);
        }
    };

    return { cart, cartCount, addToCart, removeFromCart };
}