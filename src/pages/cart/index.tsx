import RootLayout from "../layout";
import "@/app/globals.css";
import CartLayout from "./layout";
import { useState } from "react";
import useToken from "@/components/Login/UseToken";
import withAuth from "@/components/Login/Auth";
import Cart from "@/components/Cart/Cart";


function CartPage() {
    return (
        <CartLayout>
            <h1>Cart</h1>
            <Cart />
        </CartLayout>
    );
}


export default CartPage;
