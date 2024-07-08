import { ProductType } from "@/components/Product/Product";
import axios from "axios";
import { URL } from "@/api/url";

export interface Products {
    products: ProductType[];
    count: number;
}

export async function getProductsFromCart(): Promise<Products> {
    const response = localStorage.getItem('cartProducts')
    let products: ProductType[]=[]
    let count = 0;
    if(response){
        try {
            products = JSON.parse(response)
            console.log(products)
            count = products.length
        } catch (error) {
            console.log("Error loading cart items count")
        }
    }
    return {
        products: products,
        count: count,
    };
}

export async function addProduct(product: ProductType) {
    await axios
        .post(`${URL}/product/new`, {
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            // category: product.category,
            thumbnail: product.thumbnail,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log(`Added post with ID ${product.id}`);
    console.log(product)
}

export async function deleteProduct(id: number) {
    axios
        .delete(`${URL}/product/${id}`)
        .then((response) => {
            console.log(`Deleted post with ID ${id}`);
        })
        .catch((error) => {
            console.error(error);
        });
}
