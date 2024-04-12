import axios from "axios";
import { ProductType } from "../components/Product/Product";

const data_api = process.env.REACT_APP_DATA_API_URL


export async function getData():Promise<ProductType[]> {
    if (!data_api) {
      throw new Error("REACT_APP_DATA_API_URL is not defined");
    }  
    const res = await axios.get(data_api);
    console.log(res.data);
    return res.data.products;
  }