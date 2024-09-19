import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Links } from "@/components/links";
import { Provider } from "jotai";
import { useState } from "react";

export default function OrdersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const handleLogIn = () => {};

    return (
        <Provider>
            <Header handleLogIn={handleLogIn} />
            <Links />
            <>{children}</>
            <Footer />
        </Provider>
    );
}
