import CartComponent from "@/components/CartComponent/CartComponent";
import RootLayout from "../layout";
import "@/app/globals.css";
import CartLayout from "./layout";

export default function Cart() {
    return (
        <CartLayout>
            <section>Cart</section>
            <CartComponent />
        </CartLayout>
    );
}
