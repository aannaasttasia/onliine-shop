"use client";
import "./css/CategoriesList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "../Product/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import { countAtom } from "../CartComponent/cartState";
import { useAtom } from "jotai";

export function CategoriesList({
    categories,
    productsDef,
}: {
    categories: string[];
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
            console.log(count);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };

    return (
        <section className="categories-list">
            <h1>Categories</h1>
            <ul className="categories-ul">
                {categories.map((category: string, index: number) => (
                    <li key={category}>
                        <div
                            className={
                                index === activeCategoryIndex ? "active" : ""
                            }
                            onClick={() => handleCategoryClick(category, index)}
                        >
                            {category}
                        </div>
                    </li>
                ))}
            </ul>
            <ProductsList products={products} />
        </section>
    );
}
