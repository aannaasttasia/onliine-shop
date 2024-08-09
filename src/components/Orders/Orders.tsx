import { ProductsCart, getOrders, getProduct } from "@/api/serverRequests";
import "./css/Orders.scss";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../Cart/useCart";
import { OrderProduct } from "./OrderProduct";
import Loader from "../Loader/Loader";

export interface OrdersProps {
    id: number;
    userId: number;
    totalPrice: number;
    products: ProductsCart[];
    date: Date;
}

export default function Orders() {
    const [orders, setOrders] = useState<OrdersProps[]>([]);
    const userId = useAtomValue(userIdAtom);

    useEffect(() => {
        const fetchOrders = async () => {
            console.log(userId);
            if (userId !== null) {
                try {
                    const response = await getOrders(userId);
                    setOrders(response);
                    console.log(userId);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            }
        };
        fetchOrders();
    }, [userId]);

    return (
        <div className="orders__section">
            <h1>Order History</h1>
            {orders.length > 0 ? (
                <div className="orders">
                    {orders.map((order) => (
                        <div key={order.id} className="orders__order-section">
                            <p>{JSON.stringify(order.date)}</p>
                            <div className="orders__products">
                                {order.products.map((product) => (
                                    <div key={product.id} className="orders__order">
                                        <OrderProduct product={product} />
                                        <p className="orders__product-quantity">x{product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="orders__total-price">Total price: ${order.totalPrice}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
