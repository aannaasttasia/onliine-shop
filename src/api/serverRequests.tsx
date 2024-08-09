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

export interface ProductsCart {
    id: number;
    quantity: number;
}
export interface PaymentParamsType {
    userId: number | null;
    products: ProductsCart[];
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
    console.log(`Bearer ${JSON.parse(token)}`);
    return await axios.post(
        `${url}/supportHistory/new`,
        {
            email: params.email,
            description: params.description,
        },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }
    );
}

export async function payForProducts(params: PaymentParamsType) {
    const response = await axios.post(`${url}/payment/${params.userId}`, {
        products: params.products,
    });
    const result: { success: boolean } = response.data;
    return {
        success: result.success,
    };
}

export async function getUser(userId: number) {
    const response = await axios.get(`${url}/user/${userId}`);
    return response.data;
}

export async function getOrders(userId: number | null) {
    if (userId) {
        const response = await axios.get(`${url}/order/${userId}`);
        return response.data;
    } else {
        console.error("User is not found")
    }
}

export async function getProduct(id: number) {
    const response = await axios.get(`${url}/product/${id}`);
    return response.data;
}
