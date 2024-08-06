import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Links } from "@/components/links";
import "@/app/globals.css";
import { Provider as JotaiProvider, Provider } from "jotai";
import withAuth from "@/components/Login/Auth";
import { useState } from "react";

export default function CategoriesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [logIn, setLogIn] = useState<boolean>(false);

    const handleLogIn = () => {
        setLogIn(true);
    };

    const Content = logIn ? withAuth(() => (
        <>
            <Header handleLogIn={handleLogIn} />
            <Links />
            {children}
            <Footer />
        </>
    )) : () => (
        <>
            <Header handleLogIn={handleLogIn} />
            <Links />
            {children}
            <Footer />
        </>
    );

    return (
        <Provider>
            <Content />
        </Provider>
    );
}
