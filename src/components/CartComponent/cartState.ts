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
            setCartCount(data.length);
        }
    }, []);

    const addToCart = (item: ProductType) => {
        try {
            const updatedCart = [...cart, item];
            localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
            setCart(updatedCart);
            setCartCount(updatedCart.length);
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        }
    };

    const removeFromCart = (itemId: number) => {
        try {
            const updatedCart = cart.filter(item => item.id !== itemId);
            localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
            setCart(updatedCart);
            setCartCount(updatedCart.length);
        } catch (error) {
            console.error("Failed to delete item from cart:", error);
        }
    };

    return { cart, cartCount, addToCart, removeFromCart };
}