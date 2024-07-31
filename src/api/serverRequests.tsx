import { ProductType } from "@/components/Product/Product";
import axios from "axios";
import { url } from "@/api/url";
import { UserProps } from "@/components/Login/Login";
import { NewUserType } from "@/components/Login/Register";

export interface Products {
    products: ProductType[];
    count: number;
}
export interface MessageType {
    email: string;
    description: string;
}

export async function getProductsFromCart(): Promise<Products> {
    const response = localStorage.getItem("cartProducts");
    let products: ProductType[] = [];
    let count = 0;
    if (response) {
        try {
            products = JSON.parse(response);
            console.log(products);
            count = products.length;
        } catch (error) {
            console.log("Error loading cart items count");
        }
    }
    return {
        products: products,
        count: count,
    };
}

export async function loginUser(
    credentials: UserProps
): Promise<{ access_token: string }> {
    try {
        const response = await axios.post(`${url}/auth/login`, credentials, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed. Please check your credentials.");
    }
}

export async function newUser(credentials: NewUserType) {
    return await axios.post(`${url}/user/new`, credentials);
}

export async function newMessage(params: MessageType, token: string) {
    console.log(`Bearer ${JSON.parse(token)}`)
    return await axios.post(`${url}/supportHistory/new`, {
        email: params.email,
        description: params.description
    }, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(token)}`,
        },
    });
}
