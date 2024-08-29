import { useAtom, useAtomValue } from "jotai";
import * as React from "react";
import { ProductType } from "../Product/Product";
import CartProduct from "../CartProduct/CartProduct";
import { ChangeEvent, useEffect, useState } from "react";
import { countAtom, useCart, userIdAtom } from "./useCart";
import Loader from "../Loader/Loader";
import "@/app/globals.css";
import getFromCart from "./getFromCart";
import {
    ProductsCart,
    payForProducts,
    payForProductsInEth,
} from "@/api/serverRequests";
import useToken from "../Login/UseToken";
import axios from "axios";
import withAuth from "../Login/Auth";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Dropdown, { convertedPriceAtom, selectedOptionAtom } from "./Dropdown";
import { parseEther } from "viem";
import { sendTransaction, createClient, checkBalance } from "@/client";
import { parse } from "path";

const calculateTotalPrice = (products: ProductType[]): number => {
    let totalPrice = 0;
    products.forEach((product) => {
        const productPrice = parseFloat(product.price) * product.quantity;
        totalPrice += productPrice;
    });
    const totalPriceFixed = parseFloat(totalPrice.toFixed(2));
    return totalPriceFixed;
};

//const ethAmount = parseEther("0.00000001");

export default function Cart() {
    const [cartStorage, setCartStorage] = useState<ProductType[]>([]);
    const [productAmount, setProductAmount] = useAtom(countAtom);
    const userId = useAtomValue(userIdAtom);
    const [success, setSuccess] = useState<string>("");
    const [products, setProducts] = useState<ProductsCart[]>([]);
    const [payClicked, setPayClicked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    const selectedCurrency = useAtomValue(selectedOptionAtom);
    const convertedPrice = useAtomValue(convertedPriceAtom);
    const ethAmount = parseEther(convertedPrice.toString());


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
        let response;
        const account = localStorage.getItem("defaultAccount");
        const walletClient = createClient(account);
        try {
            if (userId && products.length > 0) {
                if (selectedCurrency === "dollars") {
                    response = await payForProducts({
                        userId: userId,
                        products: products,
                    });
                    console.log(selectedCurrency);
                } else {
                    const transaction = await sendTransaction(
                        ethAmount,
                        account,
                        walletClient
                    );
                    console.log(ethAmount)
                    if (transaction) {
                        response = await payForProductsInEth({
                            userId: userId,
                            products: products,
                        });
                    } else {
                        response = { success: "false" };
                    }
                }
                const successResult = response.success;
                setSuccess(successResult);
                if (successResult === "true") {
                    localStorage.removeItem(`cartProducts_${userId}`);
                    setCartStorage([]);
                    setProductAmount(0);
                    setPayClicked(false);
                }
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
                                <li key={cartItem.id} className="cart-product__item">
                                    <CartProduct product={cartItem} quantity={cartItem.quantity}/>
                                </li>
                            ))}
                        </ul>
                        <div className="cart__payment">
                            <div className="total-price">
                                <p>Total price:</p>
                                <Dropdown
                                    price={calculateTotalPrice(cartStorage)}
                                />
                            </div>
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
                    {success === "true" ? (
                        <div>
                            <p>Payment was successful</p>
                            <i className="fa-regular fa-circle-check"></i>
                        </div>
                    ) : success === "false" ? (
                        <div>
                            <p>Payment failed</p>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </div>
                    ) : null}
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
