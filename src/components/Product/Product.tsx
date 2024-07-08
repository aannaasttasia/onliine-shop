import { Component, useState } from "react";
import "./css/Product.scss";
import { useAddToCart } from "../CartComponent/CartComponent";
import Popup from "reactjs-popup";

export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    category: string;
    thumbnail: string;
}

const Product = ({ product }: { product: ProductType }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleAddToCart = () => {
        useAddToCart(product);
        setIsHovered(false);
    };

    return (
        <article
            key={product.id}
            className="product"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
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
                        <Popup
                            trigger={
                                <button
                                    className="buy-button"
                                    onClick={handleAddToCart}
                                >
                                    Buy
                                </button>
                            }
                            position="bottom center"
                            on="hover"
                        >
                            <div className="product__popup">
                                {product.description}
                            </div>
                        </Popup>
                    )}
                </div>
            </div>
        </article>
    );
};

export default Product;
