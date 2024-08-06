"use client";
import "./css/CategoriesList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "../Product/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import { CategoryType } from "@/pages/categories";
import { url } from "@/api/url";

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

    const handleCategoryClick = async (categoryId: number, index: number) => {
        try {
            const response = await axios.get(
                `${url}/products/${categoryId-1}`
            );
            setProducts(response.data);
            setActiveCategoryIndex(index);
            console.log(response.data);
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
                            onClick={() => handleCategoryClick(category.id, index)}
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
