import { Provider, atom, useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { ProductsList } from "@/components/ProductsList/ProductsList";
import RootLayout from "./layout";
import { getData } from "@/api/getData";
import { ProductType } from "@/components/Product/Product";
import Loader from "@/components/Loader/Loader";
import SearchBar from "@/components/SearchBar/SearchBar";
import NotFound from "@/components/NotFound/NotFound";

const productsAtom = atom<ProductType[]>([]);

export const getServerSideProps = async () => {
    const response = await getData();
    const productsRandom = [...response]
        .sort(() => 0.5 - Math.random())
        .slice(0, 12);
    console.log("here", productsRandom)
    return { props: { products: productsRandom || [] } };
};

function Home({ products }: { products: ProductType[] }) {
    const [storedProducts, setStoredProducts] = useAtom(productsAtom);
    const [loadedHomePage, setLoadedHomePage] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] =
        useState<ProductType[]>([]);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true)
        if (products.length > 0) {
            setStoredProducts(products);
            setFilteredProducts(products)
            if (storedProducts) setLoadedHomePage(true);
        } else {
            setStoredProducts([]);
        }
    }, [products]);

    const handleSearch = (filtered: ProductType[]) => {
        setFilteredProducts(filtered)
    };

    return (
        <RootLayout>
            <SearchBar products={products} onSearch={handleSearch} />
            {filteredProducts.length > 0 ? (
                loadedHomePage ? (
                    <ProductsList products={filteredProducts} />
                ) : (
                    <Loader />
                )
            ) : (
                <NotFound />
            )}
        </RootLayout>
    );
}

export default Home;
