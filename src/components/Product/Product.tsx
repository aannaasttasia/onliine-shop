import { Component, useEffect, useRef, useState } from "react";
import "./css/Product.scss";
import { useCart } from "../Cart/useCart";
import ProductInfo from "../ProductInfo/ProductInfo";

export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: string;
    category: string;
    thumbnail: string;
    quantity: number;
}

const Product = ({ product }: { product: ProductType }) => {
    const [showProductInfo, setShowProductInfo] = useState<boolean>(false);
    const overlayProductRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        function handler(event: MouseEvent) {
            if (
                overlayProductRef.current &&
                overlayProductRef.current === event.target
            ) {
                console.log("clicked outside of modal");
                setShowProductInfo(false);
            }
        }
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    const handleItemClick = () => {
        setShowProductInfo(true);
    };
    const handleAddToCart = () => {
        addToCart(product);
        console.log(product);
    };

    return (
        <article key={product.id} className="product">
            <div>
                <h1 className="product-name">{product.title}</h1>
                <figure>
                    <div className="img-wrapper" onClick={handleItemClick}>
                        <img src={product.thumbnail} alt="picture-of-product" />
                    </div>
                    <figcaption>
                        <p className="product-price">${product.price}</p>
                    </figcaption>
                </figure>
                <div className="product-btn">
                    <button className="buy-button" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
            {showProductInfo && (
                <div className="productInfo__popup">
                    <div
                        className="productInfo__overlay"
                        ref={overlayProductRef}
                    >
                        <div className="productInfo__modal">
                            <ProductInfo product={product} />
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
};

export default Product;
