import { atom } from "jotai";
import { ProductType } from "../Product/Product";
import { getProductsFromCart } from "@/api/serverRequests";

export const countAtom = atom<number>(0);

export const asyncDataAtom = atom(async () => {
    const response = await getProductsFromCart();
    const data = response.count;
    return data;
});

