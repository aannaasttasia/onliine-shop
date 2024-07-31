import React, { useState } from "react";
import "./css/Login.scss";
import axios from "axios";
import { url } from "@/api/url";
import { loginUser } from "@/api/serverRequests";


export interface UserProps {
    email: string;
    password: string;
}

export interface TokenProps {
    setToken: (token: string) => void;
    setIsAccount: () => void
}

export default function Login({ setToken, setIsAccount }: TokenProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password,
        });
        setToken(token.access_token);
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <p>You do not have an account?</p>
            <button onClick={setIsAccount}>Register</button>
        </div>
    );
}
