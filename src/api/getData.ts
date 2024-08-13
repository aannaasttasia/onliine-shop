import axios from "axios";
import { ProductType } from "../components/Product/Product";
import { url } from "./url";

const data_api = process.env.REACT_APP_DATA_API_URL

export async function getData():Promise<ProductType[]> {
    if (!data_api) {
      throw new Error("REACT_APP_DATA_API_URL is not defined");
    }  
    const res = await axios.get(`${url}/products`);

    const products = res.data.map((product: ProductType) => ({
      ...product,
      quantity: 0
  }));
    return products;
}