import { Provider, atom, useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { ProductsList } from "@/components/ProductsList/ProductsList";
import RootLayout from "./layout";
import { getData } from "@/api/getData";
import { ProductType } from "@/components/Product/Product";
import { getProductsFromCart } from "@/api/serverRequests";
import { countAtom } from "@/components/CartComponent/cartState";
import Loader from "@/components/Loader/Loader";
import SearchBar from "@/components/SearchBar/SearchBar";
import NotFound from "@/components/NotFound/NotFound";

const productsAtom = atom<ProductType[]>([]);

export const getServerSideProps = async () => {
    const products = await getData();
    return { props: { products: products || [] } };
};

export default function Home({ products }: { products: ProductType[] }) {
    const [storedProducts, setStoredProducts] = useAtom(productsAtom);
    const [, setCartCount] = useAtom(countAtom);
    const [loadedHomePage, setLoadedHomePage] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products);

    useEffect(() => {
        if (products && products.length > 0) {
            setStoredProducts(products);
            if (storedProducts) setLoadedHomePage(true);
        } else {
            setStoredProducts([]);
        }
        const fetchCart = async () => {
            try {
                const res = await getProductsFromCart();
                const count = res.count;
                setCartCount(count);
                console.log("count", count);
            } catch (error) {
                console.error("Failed to fetch cart and count:", error);
            }
        };
        fetchCart();
    }, [setCartCount, products, setStoredProducts]);

    const handleSearch = (filteredProducts: ProductType[]) => {
        setFilteredProducts(filteredProducts);
        console.log(filteredProducts);
    };

    return (
        <Provider>
            <RootLayout>
                <SearchBar products={products} onSearch={handleSearch} />
                {filteredProducts.length !== 0 ? (
                    loadedHomePage ? (
                        <ProductsList products={filteredProducts} />
                    ) : (
                        <Loader />
                    )
                ) : (
                    <NotFound />
                )}
            </RootLayout>
        </Provider>
    );
}
