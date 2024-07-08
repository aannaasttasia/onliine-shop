import { CategoryType } from "@/pages/categories";
import axios from "axios";

const categories_api = process.env.REACT_APP_DATA_API_URL


export async function getCategories():Promise<CategoryType[]> {
    if (!categories_api) {
        throw new Error("REACT_APP_CATEGORIES_API_URL is not defined");
    } 
    const res = await axios.get(`${categories_api}/categories`);
    console.log(res.data);
    return res.data;
  }