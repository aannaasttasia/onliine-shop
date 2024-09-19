"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import "./css/Header.scss";
import Theme from "../Theme/Theme";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { userIdAtom } from "../Cart/useCart";
import { atom, useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { requestAccounts } from "@/walletMethods";
import "@/app/globals.css";
import { getBalance } from "viem/actions";
import { checkBalance, createClient } from "@/client";

interface HeaderProps {
    handleLogIn: () => void;
}

export const accountAtom = atom<string>("");

function Header({ handleLogIn }: HeaderProps) {
    const [isAccountActive, setIsAccountActive] = useState<boolean>(false);
    const userID = useAtomValue<number | null>(userIdAtom);
    const [defaultAccount, setDefaultAccount] = useAtom(accountAtom);
    const pathname = usePathname();

    const handleOpenAccountInfo = async () => {
        setIsAccountActive(!isAccountActive);
    };

    useEffect(() => {
        const savedAccount = localStorage.getItem("defaultAccount");
        if (savedAccount) {
            setDefaultAccount(savedAccount);
        }

    }, []);

    const connectWallet = async () => {
        const accounts = await requestAccounts();
        setDefaultAccount(accounts[0]);
        console.log(accounts)
        localStorage.setItem("defaultAccount", accounts[0]);
    };

    return (
        <div className="header__container">
            <header className="header">
                <div className="header__logo">aannaasttasia</div>
                <div className="header__theme-btn">
                    <Theme />
                </div>
                <div className="header_account">
                    <div
                        className={defaultAccount? "header_wallet_connected": "header_wallet_is-not-connected"}
                        onClick={async () => {
                            await connectWallet();
                        }}
                    >
                        {useAtomValue(accountAtom)
                            ? "Connected"
                            : "Connect wallet"}
                    </div>
                    {userID ? (
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
