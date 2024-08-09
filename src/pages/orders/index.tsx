"use client";
import Orders, { OrdersProps } from "@/components/Orders/Orders";
import { Provider, useAtomValue } from "jotai";
import OrdersLayout from "./layout";
import { getOrders } from "@/api/serverRequests";
import { userIdAtom } from "@/components/Cart/useCart";
import { useEffect, useState } from "react";


function OrdersPage() {
    return (
        <Provider>
            <OrdersLayout>
                <Orders/>
            </OrdersLayout>
        </Provider>
    );
}

export default OrdersPage;
