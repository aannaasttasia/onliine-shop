import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import * as React from "react";
import { ProductType } from "../Product/Product";
import CartProduct from "../CartProducts/CartProduct";
import { useEffect, useState } from "react";
import { countAtom, useCart, userIdAtom } from "./useCart";
import Loader from "../Loader/Loader";
import "@/app/globals.css";
import getFromCart from "./getFromCart";
import { payForProducts } from "@/api/serverRequests";
import useToken from "../Login/UseToken";
import axios from "axios";

interface CartComponentProps {
    onPayClickedChange: () => void;
}

const calculateTotalPrice = (products: ProductType[]): number => {
    let totalPrice = 0;
    products.forEach((product) => {
        const productPrice = parseFloat(product.price) * product.quantity;
        totalPrice += productPrice;
    });
    const totalPriceFixed = parseFloat(totalPrice.toFixed(2));
    return totalPriceFixed;
};

export default function Cart({ onPayClickedChange }: CartComponentProps) {
    const [cartStorage, setCartStorage] = useState<ProductType[]>([]);
    const [productAmount] = useAtom(countAtom);
    const userId = useAtomValue(userIdAtom);
    const [clear, setClear] = useState<boolean>(false);
    const { products } = getFromCart();

    useEffect(() => {
        const cartStorageString = localStorage.getItem(
            `cartProducts_${userId}`
        );
        if (cartStorageString) {
            const data = JSON.parse(cartStorageString);
            setCartStorage(data);
            console.log("cartStorage:", cartStorage);
        } else {
            setCartStorage([]);
            console.log("No cart products stored in localStorage");
        }
    }, [productAmount, userId, clear]);

    const handlePay = async () => {
        try {
            if (userId) {
                console.log(products)
                if (products) {
                    await payForProducts({
                        userId: userId,
                        products: products,
                    });
                    localStorage.removeItem(`cartProducts_${userId}`);
                }
            }
            onPayClickedChange()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message || "An error occurred";
                console.error("Payment error:", errorMessage);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <section className="cart__container">
            {cartStorage ? (
                <div className="cart">
                    <ul className="list-ul">
                        {cartStorage.map((cartItem) => (
                            <li key={cartItem.id}>
                                <CartProduct product={cartItem} />
                                <div>Quantity: {cartItem.quantity}</div>
                            </li>
                        ))}
                    </ul>
                    <p className="total-price">
                        Total price: ${calculateTotalPrice(cartStorage)}
                    </p>
                    <button className="pay-btn" onClick={handlePay}>
                        Pay
                    </button>
                </div>
            ) : (
                <Loader />
            )}
        </section>
    );
}
