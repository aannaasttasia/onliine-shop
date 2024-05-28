"use client";
import "./css/CategoriesList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "../Product/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import { countAtom } from "../CartComponent/cartState";
import { useAtom } from "jotai";
import { CategoryType } from "@/pages/categories";

export function CategoriesList({
    categories,
    productsDef,
}: {
    categories: CategoryType[];
    productsDef: ProductType[];
}) {
    const [products, setProducts] = useState<ProductType[]>(productsDef);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<
        number | null
    >(0);
    const [count, setCount] = useAtom<number>(countAtom);

    const handleCategoryClick = async (category: string, index: number) => {
        try {
            const response = await axios.get(
                `https://dummyjson.com/products/category/${category}`
            );
            setProducts(response.data.products);
            setActiveCategoryIndex(index);
            console.log(index);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };

    return (
        <section className="categories-list">
            <h1>Categories</h1>
            <ul className="categories-ul">
                {categories.map((category: CategoryType, index: number) => (
                    <li key={category.name}>
                        <div
                            className={
                                index === activeCategoryIndex ? "active" : ""
                            }
                            onClick={() => handleCategoryClick(category.slug, index)}
                        >
                            {category.name}
                        </div>
                    </li>
                ))}
            </ul>
            <ProductsList products={products} />
        </section>
    );
}
