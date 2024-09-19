import { atom, useAtom, useSetAtom } from "jotai";
import * as React from "react";
import { ProductType } from "../Product/Product";
import CartProducts from "../CartProducts/CartProducts";
import { useEffect, useState } from "react";
import { countAtom, useCart } from "./cartState";
import Loader from "../Loader/Loader";
import "@/app/globals.css";


const calculateTotalPrice = (products: ProductType[]): number => {
    let totalPrice = 0;
    products.forEach((product) => {
        const productPrice = parseFloat(product.price) * product.quantity;
        totalPrice += productPrice;
    });
    const totalPriceFixed = parseFloat(totalPrice.toFixed(2));
    return totalPriceFixed;
};


export default function CartComponent() {
    const [cartStorage, setCartStorage] = useState<ProductType[]>([]);
    const [productAmount] = useAtom(countAtom);

    useEffect(() => {
        const cartStorageString = localStorage.getItem("cartProducts");
        if (cartStorageString) {
            const data = JSON.parse(cartStorageString);
            setCartStorage(data);
            console.log("cartStorage:", cartStorage);
        } else {
            console.log("No cart products stored in localStorage");
        }
    }, [productAmount]);

    return (
        <section>
            {cartStorage ? (
                <div className="cart">
                    <ul className="list-ul">
                        {cartStorage.map((cartItem) => (
                            <li key={cartItem.id}>
                                <CartProducts product={cartItem} />
                                <div>Quantity: {cartItem.quantity}</div>

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

