import { useAtom, useAtomValue } from "jotai";
import { userIdAtom } from "../Cart/useCart";
import Orders, { OrdersProps } from "../Orders/Orders";
import { useEffect, useState } from "react";
import { getOrders } from "@/api/serverRequests";
import './css/Account.scss'

export interface UserType {
    id: number;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    balance: number;
}

interface AccountProps {
    user: UserType;
    logout: () => void;
}

export default function Account({ user, logout }: AccountProps) {
    const [orders, setOrders] = useState<OrdersProps[]>([])
    const handleLogOut = () => {
        sessionStorage.removeItem("token");
        logout();
    };

    useEffect(()=>{
        const fetchOrders = async () => {
            const response = await getOrders(user.id)
            setOrders(response)
        };
        fetchOrders()
    },[])
    
    return (
        <div className="account">
            <h1>Name: {user.name}</h1>
            <p>Surname: {user.surname}</p>
            <p>Address: {user.address}</p>
            <p>Email: {user.email}</p>
            <p>Phone number: {user.phoneNumber}</p>
            <p>balance:{user.balance}</p>
            <Orders orders={orders}/>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
}
