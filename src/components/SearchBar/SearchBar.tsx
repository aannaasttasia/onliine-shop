import { useState } from "react";
import { ProductType } from "../Product/Product";
import './css/SearchBar.scss';

interface SearchBarProps {
    products: ProductType[];
    onSearch: (filtered: ProductType[]) => void;
}

export default function SearchBar({ products, onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');


    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        console.log("Search bar filtered", filteredProducts)
        onSearch(filteredProducts);
    };

    return (
        <form className="search-form">
            <input className="search-form__input" type="text" onChange={handleChangeSearch} placeholder="Search for..."/>
        </form>
    );
}
