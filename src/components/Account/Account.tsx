import { useAtom, useAtomValue } from "jotai";
import { userIdAtom } from "../Cart/useCart";
import Orders, { OrdersProps } from "../Orders/Orders";
import { useEffect, useState } from "react";
import { getOrders } from "@/api/serverRequests";
import "./css/Account.scss";

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
    const [orders, setOrders] = useState<OrdersProps[]>([]);
    const handleLogOut = () => {
        sessionStorage.removeItem("token");
        logout();
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getOrders(user.id);
            setOrders(response);
        };
        fetchOrders();
    }, []);

    return (
        <div className="account">
            <h1 className="contact__info">Contact Information</h1>
            <div className="account__container">
                <div className="profile-form-group">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={user.name}
                        className="profile-form-input"
                    ></input>
                    <label className="label">Your name</label>
                </div>
                <div className="profile-form-group">
                    <input
                        id="surname"
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        defaultValue={user.surname}
                        className="profile-form-input"
                    ></input>
                    <label className="label">Your surname</label>
                </div>
                <div className="profile-form-group">
                    <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Address"
                        defaultValue={user.address}
                        className="profile-form-input"
                    ></input>
                    <label className="label">Your address</label>
                </div>
                <div className="profile-form-group">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        defaultValue={user.email}
                        className="profile-form-input"
                    ></input>
                    <label className="label">Your email</label>
                </div>
                <div className="profile-form-group">
                    <input
                        id="phone_number"
                        type="text"
                        name="phone_number"
                        placeholder="Phone number"
                        defaultValue={`+38${user.phoneNumber}`}
                        className="profile-form-input"
                    ></input>
                    <label className="label">Your phone number</label>
                </div>
                {/* <Orders orders={orders}/> */}
            </div>
            <h1 className="profile_balance">Balance: ${user.balance.toFixed(2)}</h1>


            <button onClick={handleLogOut} className="profile_logOut">Log out</button>
        </div>
    );
}
