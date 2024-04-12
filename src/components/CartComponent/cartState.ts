import { atom } from "jotai";
import { ProductType } from "../CartProducts/CartProducts";
import { getProductsFromCart } from "@/api/serverRequests";

export const cartAtom = atom<ProductType[]>([]);
export const countAtom = atom<number>(0);

export const asyncDataAtom = atom(async () => {
    const response = await getProductsFromCart();
    const data = response.count;
    return data;
});

