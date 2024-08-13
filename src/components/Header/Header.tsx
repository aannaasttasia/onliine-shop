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
import Link from "next/link";
import { usePathname } from "next/navigation";
import useToken, { decodeToken } from "../Login/UseToken";

interface HeaderProps {
    handleLogIn: () => void;
}

function Header({ handleLogIn }: HeaderProps) {
    const [isAccountActive, setIsAccountActive] = useState<boolean>(false);
    const [userID, setUserID] = useState<number | null>(null);
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { token } = useToken();

    const handleOpenAccountInfo = async () => {
        setIsAccountActive(!isAccountActive);
    };

    useEffect(() => {
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setUserID(decodedToken.userId);
            }
        } else {
            setIsLoading(false);
        }
        setIsLoading(false);

        console.log(isLoading);
        console.log(userID);
    }, [token, setIsLoading, setUserID, setIsAccountActive]);

    return (
        <div className="header__container">
            <header className="header">
                <div className="header__logo">aannaasttasia</div>
                <div className="header__theme-btn">
                    <Theme />
                </div>
                <div className="header_account">
                    { userID ? (
                        <div
                            className="header__accountIcon"
                            onClick={handleOpenAccountInfo}
                        >
                            <Link
                                className={`link ${
                                    pathname === "/profile" ? "active" : ""
                                }`}
                                href="/profile"
                            >
                                <i className="fa-regular fa-user"></i>
                            </Link>
                        </div>
                    ) : (
                        <button onClick={handleLogIn} className="header__logIn">
                            Log in
                        </button>
                    )}
                    <div className="header__title">
                        Easy <span className="header__shopping">Shopping</span>{" "}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
