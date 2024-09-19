import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Links } from "@/components/links";
import "@/app/globals.css";
import { Provider as JotaiProvider, Provider } from "jotai";
import { useState } from "react";
import withAuth from "@/components/Login/Auth";
import { AuthenticatedContent, UnauthenticatedContent } from "../layout";

export default function CartLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [logIn, setLogIn] = useState<boolean>(false);

    const handleLogIn = () => {
        setLogIn(true);
    };

    const Content = logIn ? AuthenticatedContent : UnauthenticatedContent;

    return (
        <Provider>
            <Header handleLogIn={handleLogIn} />
            <Content>{children}</Content>
            <Footer />
        </Provider>
    )
}
