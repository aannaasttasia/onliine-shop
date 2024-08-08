import { ProductsCart } from "@/api/serverRequests";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { userIdAtom } from "./useCart";
import { ProductType } from "../Product/Product";


export default function getFromCart(products:ProductType[]) {

    const productsArr = products.map((p: { id: number; quantity: number }) => ({
        id: p.id,
        quantity: p.quantity,
    }));

  
    return productsArr
}
