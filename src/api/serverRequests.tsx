import { ProductType } from "@/components/CartProducts/CartProducts";
import axios from "axios";
import { URL } from "@/api/url";

export interface Products {
    products: ProductType[];
    count: number;
}

export async function getProductsFromCart(): Promise<Products> {
    const response = await axios.get("http://localhost:3000/products");
    const products = response.data;
    const count = products.length;
    console.log(products);
    console.log(count);
    return {
        products: products,
        count: count,
    };
}

export async function addProduct(product: ProductType) {
    await axios
        .post(`${URL}product/new`, {
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log(`Adder post with ID ${product.id}`);
}

export async function deleteProduct(id: number) {
    axios
        .delete(`${URL}product/${id}`)
        .then((response) => {
            console.log(`Deleted post with ID ${id}`);
        })
        .catch((error) => {
            console.error(error);
        });
}
