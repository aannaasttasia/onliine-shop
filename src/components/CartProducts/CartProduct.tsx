import { Component, useState } from "react";
import "@/app/globals.css";
import "./css/CartProducts.scss";
import { ProductType } from "../Product/Product";
import { useCart } from "../Cart/useCart";

const CartProduct = ({ product }: { product: ProductType }) => {
    const { removeFromCart, addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product.id);
    };

    return (
        <article key={product.id} className="product">
            <h1 className="product-name">{product.title}</h1>
            <figure>
                <div className="img-wrapper">
                    <img src={product.thumbnail} alt="picture-of-product" />
                </div>
                <figcaption>
                    <p className="product-price">${product.price}</p>
                </figcaption>
            </figure>
            <div className="product-btn">
                <button
                    className="product__buy-button"
                    onClick={handleRemoveFromCart}
                >
                    -
                </button>
                <button className="product__buy-button" onClick={handleAddToCart}>
                    +
                </button>
            </div>
        </article>
    );
};

export default CartProduct;