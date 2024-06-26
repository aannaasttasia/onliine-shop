import { getCategories } from "@/api/getCategories";
import { CategoriesList } from "@/components/CategoriesList/CategoriesList";
import CategoriesLayout from "./layout";
import axios from "axios";
import { ProductType } from "@/components/Product/Product";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { countAtom } from "@/components/CartComponent/cartState";
import { getProductsFromCart } from "@/api/serverRequests";
import Loader from "@/components/Loader/Loader";

export interface CategoryType{
    slug: string,
    name: string,
    url: string
}

const categoriesAtom = atom<CategoryType[]>([]);

export const getServerSideProps = async () => {
    const categories = await getCategories();
    const category = categories[0];
    console.log(category);
    const response = await axios.get(
        `https://dummyjson.com/products/category/${category.name}`
    );
    const productsDef = response.data.products;
    console.log(response.data.products);
    return { props: { categories, productsDef } };
};

export default function Categories({
    categories,
    productsDef,
}: {
    categories: CategoryType[];
    productsDef: ProductType[];
}) {
    const [categoriesStored, setCategoriesStore] = useAtom(categoriesAtom);
    const [, setCartCount] = useAtom(countAtom);

    useEffect(() => {
        const fetchCartAndCount = async () => {
            try {
                const res = await getProductsFromCart();
                const count = res.count;
                console.log('here',categories)
                setCategoriesStore(categories);
                setCartCount(count);
            } catch (error) {
                console.error("Failed to fetch cart and count:", error);
            }
        };

        fetchCartAndCount();
    }, [categories, setCategoriesStore, setCartCount]);

    return (
        <CategoriesLayout>
            {categoriesStored.length > 0 ? (
                <CategoriesList
                    categories={categoriesStored}
                    productsDef={productsDef}
                />
            ) : (
                <Loader />
            )}
        </CategoriesLayout>
    );
}
