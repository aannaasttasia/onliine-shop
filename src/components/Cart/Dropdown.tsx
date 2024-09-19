import { ChangeEvent, useEffect, useState } from "react";
import "@/app/globals.css";
import { convertUsdToEth } from "@/client";
import { atom, useAtom } from "jotai";

interface DropdownProps {
    price: number;
}
export const selectedOptionAtom = atom<string>('dollars');
export const convertedPriceAtom = atom<number>(0)

export default function Dropdown({ price }: DropdownProps) {
    const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
    const [convertedPrice, setConvertedPrice] = useAtom(convertedPriceAtom);

    useEffect(() => {
        const fetchConvertedPrice = async () => {
            let newPrice = price;
            if (selectedOption === "ethereum") {
                const ethPrice = await convertUsdToEth(price);
                newPrice = +ethPrice.toFixed(4);
            } else {
                newPrice = price;
            }
            setConvertedPrice(newPrice);
        };
        fetchConvertedPrice();
    }, [price, selectedOption]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);   
        console.log(convertedPrice, ",", selectedOption)         
    };

    return (
        <div className="dropdown">
            <select value={selectedOption} onChange={handleChange}>
                <option value="dollars">$</option>
                <option value="ethereum">ETH</option>
            </select>
            <div>{convertedPrice}</div>
        </div>
    );
}