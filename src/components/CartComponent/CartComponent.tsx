import { atom, useAtom, useSetAtom } from "jotai";
import * as React from "react";
import { ProductType } from "../Product/Product";
import CartProducts from "../CartProducts/CartProducts";
import { useEffect } from "react";
import {countAtom } from "./cartState";
import Loader from "../Loader/Loader";
import "@/app/globals.css";

const calculateTotalPrice = (products: ProductType[]): number => {
    let totalPrice = 0;
    products.forEach((product) => {
        const productPrice = parseFloat(product.price);
        totalPrice += productPrice;
        console.log(product.price);
    });
    console.log(totalPrice.toFixed(2));
    const totalPriceFixed = parseFloat(totalPrice.toFixed(2));
    return totalPriceFixed;
};

export default function CartComponent() {
    const [cartStorage, setCartStorage] = React.useState<ProductType[]>([]);
    const [productAmount, setProductsAmount] = useAtom(countAtom)

    useEffect(() => {
        const cartStorageString = localStorage.getItem("cartProducts");
        if (cartStorageString) {
            const data = JSON.parse(cartStorageString)
            setCartStorage(data);
            setProductsAmount(data.length)
            console.log("cartStorage:", cartStorage);
        } else {
            console.log("No cart products stored in localStorage");
        }
    }, []);

    return (
        <section>
            {cartStorage ? (
                <div className="cart">
                    <ul className="list-ul">
                        {cartStorage.map((cartItem) => (
                            <li key={cartItem.id}>
                                <CartProducts product={cartItem} />
                            </li>
                        ))}
                    </ul>
                    <p className="total-price">
                        Total price: ${calculateTotalPrice(cartStorage)}
                    </p>
                    <button className="pay-btn">Pay</button>
                </div>
            ) : (
                <Loader />
            )}
        </section>
    );
}

export function useAddToCart(item: ProductType) {
    try {
        const cart = localStorage.getItem("cartProducts");
        let existingCart: ProductType[] = [];
        if (cart) {
            try {
                existingCart = JSON.parse(cart);
                console.log("ex cart", existingCart);
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
            }
        }
        existingCart.push(item);
        localStorage.setItem("cartProducts", JSON.stringify(existingCart));
        console.log(existingCart);
    } catch (error) {
        console.error("Failed to add item to cart:", error);
    }
}

export function useRemoveFromCart() {
    const removeFromCart = (itemId: number) => {
        try {
            const cart = localStorage.getItem("cartProducts");
            let existingCart: ProductType[] = [];
            if (cart) {
                try {
                    existingCart = JSON.parse(cart);
                    console.log("ex cart", existingCart);
                } catch (error) {
                    console.error("Failed to parse cart from localStorage:", error);
                }
            }
            const filtered = existingCart.filter(item => item.id !== itemId); 
            console.log(filtered);
            localStorage.setItem("cartProducts", JSON.stringify(filtered));
        } catch (error) {
            console.error("Failed to delete item from cart:", error);
        }
    };

    return removeFromCart;
}
