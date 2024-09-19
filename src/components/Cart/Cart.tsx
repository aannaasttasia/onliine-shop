import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import { ProductType } from "../Product/Product";
import CartProduct from "../CartProduct/CartProduct";
import { useEffect, useState } from "react";
import { countAtom, useCart, userIdAtom } from "./useCart";
import Loader from "../Loader/Loader";
import "@/app/globals.css";
import getFromCart from "./getFromCart";
import { ProductsCart, payForProducts } from "@/api/serverRequests";
import useToken from "../Login/UseToken";
import axios from "axios";
import withAuth from "../Login/Auth";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface CartComponentProps {
    onPayClickedChange: () => void;
}
interface SuccessProps {
    success: boolean;
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

export default function Cart() {
    const [cartStorage, setCartStorage] = useState<ProductType[]>([]);
    const [productAmount, setProductAmount] = useAtom(countAtom);
    const userId = useAtomValue(userIdAtom);
    const [success, setSuccess] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductsCart[]>([]);
    const [payClicked, setPayClicked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    const { token } = useToken();

    useEffect(() => {
        setLoading(true);
        const cartStorageString = localStorage.getItem(
            `cartProducts_${userId}`
        );
        if (cartStorageString) {
            const data = JSON.parse(cartStorageString);
            setCartStorage(data);
            const productsArr = getFromCart(data);
            setProducts(productsArr);
            setButtonDisabled(false);
        } else {
            setCartStorage([]);
            setProductAmount(0);
            console.log("No cart products stored in localStorage");
        }
        setLoading(false);
    }, [productAmount, userId]);

    const handlePay = async () => {
        setPayClicked(true);
        try {
            if (userId && products.length > 0) {
                const response = await payForProducts({
                    userId: userId,
                    products: products,
                });
                const successResult = response.success;
                setSuccess(successResult);
                localStorage.removeItem(`cartProducts_${userId}`);
                setCartStorage([]);
                setProductAmount(0);
                setPayClicked(false);
            } else {
                console.error("Cart is empty");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message || "An error occurred";
                console.error("Payment error:", errorMessage);
            }
        }
    };

    const Content = () => {
        return (
            <section className="cart__container">
                {cartStorage.length > 0 && !success ? (
                    <div className="cart">
                        <ul className="list-ul">
                            {cartStorage.map((cartItem) => (
                                <li key={cartItem.id}>
                                    <CartProduct product={cartItem} />
                                    <div>Quantity: {cartItem.quantity}</div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart__payment">
                            <p className="total-price">
                                Total price: ${calculateTotalPrice(cartStorage)}
                            </p>
                            <button
                                className="pay-btn"
                                onClick={handlePay}
                                disabled={isButtonDisabled}
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                ) : (
                    !success && (
                        <div className="fail">
                            <div>
                                <p>Cart is empty</p>
                            </div>
                        </div>
                    )
                )}
                <div className="success">
                    {success ? (
                        <div>
                            <p>Payment was successful</p>
                            <i className="fa-regular fa-circle-check"></i>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </section>
        );
    };

    const Auth = withAuth(Content);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : payClicked ? (
                token ? (
                    <Content />
                ) : (
                    <Auth />
                )
            ) : (
                <Content />
            )}
        </div>
    );
}
