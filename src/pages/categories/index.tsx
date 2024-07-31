import { getCategories } from "@/api/getCategories";
import { CategoriesList } from "@/components/CategoriesList/CategoriesList";
import CategoriesLayout from "./layout";
import axios from "axios";
import { ProductType } from "@/components/Product/Product";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { countAtom } from "@/components/CartComponent/cartState";
import { getProductsFromCart } from "@/api/serverRequests";
import Loader from "@/components/Loader/Loader";
import Auth from "@/components/Login/Auth";

export interface CategoryType {
    slug: string;
    name: string;
    url: string;
}

const categoriesAtom = atom<CategoryType[]>([]);

export const getServerSideProps = async () => {
    try {
        const categories = await getCategories();
        const category = categories[0];
        console.log(category);
        const response = await axios.get(
            `https://dummyjson.com/products/category/${category.name}`
        );
        const productsDef = response.data.products;
        console.log(response.data.products);
        return { props: { categories, productsDef } };
    } catch (error) {
        return []
    }
};

function Categories({
    categories,
    productsDef,
}: {
    categories: CategoryType[];
    productsDef: ProductType[];
}) {
    const [categoriesStored, setCategoriesStore] = useState(categories);
    const [loadedCategories, setLoadedCategories] = useState<boolean>(false);

    useEffect(() => {
        const fetchCartAndCount = async () => {
            try {
                if (categories) setLoadedCategories(true);
                console.log("categories", categories);
                setCategoriesStore(categories);
            } catch (error) {
                console.error("Failed to fetch cart and count:", error);
            }
        };

        fetchCartAndCount();
    }, [categories, setCategoriesStore]);

    return (
        <CategoriesLayout>
            {loadedCategories ? (
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

export default Auth(Categories)