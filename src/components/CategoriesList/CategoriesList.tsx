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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isOpen);
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    const handleCategoryClick = async (categoryId: number, index: number) => {
        try {
            const response = await axios.get(
                `${url}/products/${categoryId - 1}`
            );
            setProducts(response.data);
            setActiveCategoryIndex(index);
            setIsOpen(!isOpen);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const Content = () => {
        return (
            <ul className="categories-ul">
                {categories.map((category: CategoryType, index: number) => (
                    <li key={category.name}>
                        <div
                            className={
                                index === activeCategoryIndex ? "active" : ""
                            }
                            onClick={() =>
                                handleCategoryClick(category.id, index)
                            }
                        >
                            {category.name}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section className="categories-section">
            <div className="categories-list">
                <h1>Categories</h1>
                <div className="categories-open-btn" onClick={handleOpen}></div>
                {isOpen && (
                    <div className="categories-overlay">
                        <div className="categories-content">
                            <Content />
                        </div>
                    </div>
                )}
                <div className="categories-full-content">
                    <Content />
                </div>
            </div>
            <ProductsList products={products} />
        </section>
    );
}
