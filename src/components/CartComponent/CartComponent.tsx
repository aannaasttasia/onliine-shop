import { atom, useAtom, useSetAtom } from "jotai";
import * as React from "react";
import Product, { ProductType } from "../Product/Product";
import CartProducts from "../CartProducts/CartProducts";
import {
    addProduct,
    deleteProduct,
    getProductsFromCart,
} from "@/api/serverRequests";
import { useEffect } from "react";
import { cartAtom, countAtom } from "./cartState";
import Loader from "../Loader/Loader";

export default function CartComponent() {
    const [cartStorage, setCartStorage] = useAtom(cartAtom);
    const [, setCounter] = useAtom(countAtom);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getProductsFromCart();
                const products = res.products;
                setCartStorage(products);
                setCounter(res.count);
                console.log("comp", res.count);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchCart();
    }, [setCartStorage]);

    return (
        <section>
            {cartStorage && cartStorage.length > 0 ? (
                <ul className="list-ul">
                    {cartStorage.map((cartItem) => (
                        <li key={cartItem.id}>
                            <CartProducts product={cartItem} />
                        </li>
                    ))}
                </ul>
            ) : (
                <Loader />
            )}
        </section>
    );
}

export function useAddToCart() {
    const [cartList, setCartList] = useAtom(cartAtom);
    const setCounter = useSetAtom(countAtom);

    function addToCart(product: ProductType) {
        setCartList([...cartList, product]);
        console.log(product);
        addProduct(product);
        setCounter((prev) => prev + 1);
    }

    return addToCart;
}

export function useRemoveFromCart(itemId: number) {
    const [cartList, setCartList] = useAtom(cartAtom);
    const setCounter = useSetAtom(countAtom);

    const removeItem = async () => {
        try {
            await deleteProduct(itemId);
            const updatedCart = cartList.filter((item) => item.id !== itemId);
            setCartList(updatedCart);
            setCounter((prev) => prev - 1);
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };

    return removeItem;
}
