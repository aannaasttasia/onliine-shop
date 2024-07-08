import { Component, useState } from "react";
import { useRemoveFromCart } from "../CartComponent/CartComponent";
import "@/app/globals.css";
import "./css/CartProducts.scss";
import { ProductType } from "../Product/Product";


const CartProducts = ({ product }: { product: ProductType }) => {
    const [isHovered, setIsHovered] = useState(false);
    const removeFromCart = useRemoveFromCart();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product.id);
    };

    return (
        <article
            key={product.id}
            className="product"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
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
                {isHovered && (
                    <button
                        className="buy-button"
                        onClick={handleRemoveFromCart}
                    >
                        Remove
                    </button>
                )}
            </div>
        </article>
    );
};

export default CartProducts;
