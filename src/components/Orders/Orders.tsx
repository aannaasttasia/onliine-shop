import { ProductsCart, getProduct } from "@/api/serverRequests";
import "./css/Orders.scss";
import { useEffect, useState } from "react";
import { ProductType } from "../Product/Product";

export interface OrdersProps {
    id: number;
    userId: number;
    totalPrice: number;
    products: ProductsCart[];
    date: Date;
}

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
        <div>
            <div>{productItem?.title}</div>
        </div>
    );
}

export default function Orders({ orders }: { orders: OrdersProps[] }) {
    return (
        <div className="orders">
            <h1>Order History</h1>
            {orders.map((order) => (
                <div key={order.id}>
                    <p>{JSON.stringify(order.date)}</p>
                    {order.products.map((product) => (
                        <div key={product.id}>
                            <OrderProduct product={product} />
                            <p>{product.quantity}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
