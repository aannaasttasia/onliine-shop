import { useAtom, useAtomValue } from "jotai";
import { userIdAtom } from "../Cart/useCart";
import Orders, { OrdersProps } from "../Orders/Orders";
import { useEffect, useState } from "react";
import { getOrders, getUser } from "@/api/serverRequests";
import "./css/Account.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export interface UserType {
    id: number;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    balance: number;
}


export default function Account() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<UserType>();
    const [userID, setUserID] = useAtom<number | null>(userIdAtom);

    useEffect(() => {
        const fetchOrders = async () => {
            if (userID) {
                const userInfo = await getUser(userID);
                setUser(userInfo);
            }
        };
        fetchOrders();
    }, [userID]);


    const handleLogOut = () => {
        sessionStorage.removeItem("token");
        setUserID(null);
        setUser(undefined);
        localStorage.removeItem("cartProducts_null");
        router.push('/categories');
    };

    return ( user &&
        <div className="account">
            <h1 className="contact__info">Contact Information</h1>
            <div className="account__container">
                <div className="profile-form-group">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder=" "
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
                        placeholder=" "
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
                        placeholder=" "
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
                        placeholder=" "
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
                        placeholder=" "
                        defaultValue={`+38${user.phoneNumber}`}
                        className="profile-form-input"
                    ></input>
                    <label className="label">Your phone number</label>
                </div>
            </div>
            <Link
                // className={`link ${pathname === "/orders" ? "orders active" : "orders"}`}
                className="profile-orders"
                href="/orders"
            >
                Orders history
            </Link>
            <h1 className="profile_balance">
                Balance: ${user.balance.toFixed(2)}
            </h1>
            <button onClick={handleLogOut} className="profile_logOut">
                Log out
            </button>
        </div>
    );
}
