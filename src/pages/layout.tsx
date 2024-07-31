import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Links } from "@/components/links";
import "../app/globals.css";
import { Provider as JotaiProvider, Provider } from "jotai";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider>
            <Header />
            <Links />
            <main>{children}</main>
            <Footer />
        </Provider>
    );
}
