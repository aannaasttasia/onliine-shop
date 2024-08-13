import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Links } from "@/components/links";
import "../app/globals.css";
import { Provider as JotaiProvider, Provider } from "jotai";
import withAuth from "@/components/Login/Auth";
import { useState } from "react";


export const AuthenticatedContent = withAuth(({ children }: { children: React.ReactNode }) => (
    <>
        <Links />
        {children}
    </>
));

export const UnauthenticatedContent = ({ children }: { children: React.ReactNode }) => (
    <>
        <Links />
        {children}
    </>
);

export default function RootLayout({
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
    );
}