import CartComponent from "@/components/CartComponent/CartComponent";
import RootLayout from "../layout";
import "@/app/globals.css";
import CartLayout from "./layout";
import Auth from "@/components/Login/Auth";

function Cart() {
    return (
        <CartLayout>
            <section>Cart</section>
            <CartComponent />
        </CartLayout>
    );
}

export default Auth(Cart)