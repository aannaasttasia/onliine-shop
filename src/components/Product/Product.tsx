import { Component, useState } from "react";
import "./css/Product.scss";
import { useAddToCart } from "../CartComponent/CartComponent";

export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
}

const Product = ({ product }: { product: ProductType }) => {
    const [isHovered, setIsHovered] = useState(false);
    const addToCart = useAddToCart();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleAddToCart = () => {
        addToCart(product);
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
                    <button className="buy-button" onClick={handleAddToCart}>
                        Buy
                    </button>
                )}
            </div>
        </article>
    );
};

export default Product;
