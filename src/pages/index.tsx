import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";
import { ProductsList } from "@/components/ProductsList/ProductsList";
import RootLayout from "./layout";
import { getData } from "@/api/getData";
import { ProductType } from "@/components/Product/Product";
import { getProductsFromCart } from "@/api/serverRequests";
import { countAtom } from "@/components/CartComponent/cartState";
import Loader from "@/components/Loader/Loader";

const productsAtom = atom<ProductType[]>([]);

export const getServerSideProps = async () => {
    const products = await getData();
    return { props: { products: products || [] } };
};

export default function Home({ products }: { products: ProductType[] }) {
    const [storedProducts, setStoredProducts] = useAtom(productsAtom);
    const [, setCartCount] = useAtom(countAtom);

    useEffect(() => {
        if (products && products.length > 0) {
            setStoredProducts(products);
        } else {
            setStoredProducts([]);
        }
        const fetchCart = async () => {
            try {
                const res = await getProductsFromCart();
                const count = res.count;
                setCartCount(count);
            } catch (error) {
                console.error("Failed to fetch cart and count:", error);
            }
        };
        fetchCart();
    }, [setCartCount, products, setStoredProducts]);

    return (
        <RootLayout>
            {storedProducts.length > 0 ? (
                <ProductsList products={storedProducts} />
            ) : (
                <Loader />
            )}
        </RootLayout>
    );
}
