import { ProductsCart } from "@/api/serverRequests";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { userIdAtom } from "./useCart";


export default function getFromCart() {
    const [products, setProducts] = useState<ProductsCart[]>([]);
    const userId = useAtomValue(userIdAtom)
  
    useEffect(() => {
        const productsFromStorage = localStorage.getItem(`cartProducts_${userId}`)
        if(productsFromStorage){
            const parsedProducts = JSON.parse(productsFromStorage)
            const productsArr = parsedProducts.map((p: { id: number; quantity: number }) => ({
                id: p.id,
                quantity: p.quantity,
            }));
            setProducts(productsArr);
        }
    }, [userId]);
  
    return { products };
}
