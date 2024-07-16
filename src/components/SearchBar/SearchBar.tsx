import { useState } from "react";
import { ProductType } from "../Product/Product";
import './css/SearchBar.scss';

interface SearchBarProps {
    products: ProductType[];
    onSearch: (filteredProducts: ProductType[]) => void;
}

export default function SearchBar({ products, onSearch }: SearchBarProps) {

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        onSearch(filteredProducts);
    };


    return (
        <form className="search-form">
            <input className="search-form__input" type="text" onChange={handleChangeSearch} placeholder="Search for..."/>
        </form>
    );
}
