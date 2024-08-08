"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import "./css/Header.scss";
import Theme from "../Theme/Theme";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Account, { UserType } from "../Account/Account";
import { getUser } from "@/api/serverRequests";
import { userIdAtom } from "../Cart/useCart";
import { useAtom, useAtomValue } from "jotai";

interface HeaderProps {
    handleLogIn: () => void;
}

function Header({ handleLogIn }: HeaderProps) {
    const [isAccountActive, setIsAccountActive] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>();
    const [userID, setUserID] = useAtom<number | null>(userIdAtom);
    const [loading, setLoading] = useState<boolean>(false); 

    const handleOpenAccountInfo = async () => {
        if (userID) {
            const userInfo = await getUser(userID);
            setUser(userInfo);
            setIsAccountActive(!isAccountActive);
        }
    };

    const handleCloseAccountInfo = () => {
        setIsAccountActive(false);
    };

    const logOut = () => {
        setUserID(null);
        setUser(undefined);
        localStorage.removeItem('cartProducts_null')
    };

    return (
        <div className="header__container">
            <header className="header">
                <div className="header__logo">aannaasttasia</div>
                <div className="header__theme-btn">
                    <Theme />
                </div>
                <div className="header_account">
                     {userID ? (
                        <div
                            className="header__accountIcon"
                            onClick={handleOpenAccountInfo}
                        >
                            <i className="fa-regular fa-user"></i>
                        </div>
                    ) : (
                        <button onClick={handleLogIn} className="header__logIn">Log in</button>
                    )}
                    <div className="header__title">
                        Easy <span className="header__shopping">Shopping</span>{" "}
                    </div>
                </div>
            </header>
            {user && isAccountActive && (
                <div className="header__wrapper">
                    <div className="header__accountInfo">
                        <Account user={user} logout={logOut} />
                        <button onClick={handleCloseAccountInfo}>x</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
