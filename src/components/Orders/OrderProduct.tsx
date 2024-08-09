import { ProductsCart, getOrders, getProduct } from "@/api/serverRequests";
import "./css/Orders.scss";
import { useEffect, useState } from "react";
import { ProductType } from "../Product/Product";
import Loader from "../Loader/Loader";

export function OrderProduct({ product }: { product: ProductsCart }) {
    const [productItem, setProductItem] = useState<ProductType>();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProduct(product.id);
            setProductItem(response);
            console.log(response);
        };
        fetchProducts();
    }, []);

    return (
        <div className="order-product">
            {productItem && (
                <div className="order-product__info">
                    <p className="product-name">{productItem.title}</p>
                    <div className="order__img-wrapper">
                        <img
                            src={productItem.thumbnail}
                            alt="picture-of-product"
                        />
                    </div>
                    <p className="product-price">${productItem.price}</p>
                </div>
            )}
        </div>
    );
}
