import RootLayout from "../layout";
import "@/app/globals.css";
import CartLayout from "./layout";
import { useState } from "react";
import useToken from "@/components/Login/UseToken";
import withAuth from "@/components/Login/Auth";
import Cart from "@/components/Cart/Cart";

interface CartJSXProps {
    handleSetPayClicked: () => void;
}

function CartJSX({ handleSetPayClicked }: CartJSXProps) {
    return (
        <CartLayout>
            <section>Cart</section>
            <Cart onPayClickedChange={handleSetPayClicked} />
        </CartLayout>
    );
}

function CartPage() {
    const [payClicked, setPayClicked] = useState<boolean>(false);
    const { token } = useToken();

    const handleSetPayClicked = () => {
        console.log(payClicked);
        setPayClicked(true);
    };

    if (!token && payClicked) {
        const AuthenticatedCartJSX = withAuth(CartJSX);
        return (
            <AuthenticatedCartJSX handleSetPayClicked={handleSetPayClicked} />
        );
    }

    return <CartJSX handleSetPayClicked={handleSetPayClicked} />;
}

export default CartPage;
