import React, { useEffect, useState } from "react";
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
    setIsAccount: () => void;
}

export default function Login({ setToken, setIsAccount }: TokenProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        setButtonDisabled(!(email && password));
        console.log(isButtonDisabled);
    }, [email, password, setEmail, setPassword]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!isButtonDisabled) {
            e.preventDefault();
            const token = await loginUser({
                email,
                password,
            });
            if (token) setToken(token.access_token);
            console.log("yes")
            localStorage.removeItem("cartProducts_null");
        }
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit} className="login__form">
                <div className="login-form-group">
                    <input
                        type="text"
                        className="login-form-input"
                        placeholder=" "
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <label className="label">Email</label>
                </div>
                <div className="login-form-group">
                    <input
                        className="login-form-input"
                        type="password"
                        placeholder=" "
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="label">Password</label>
                </div>
                <div>
                    <button
                        type="submit"
                        className="login-submit"
                        disabled={isButtonDisabled}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="login-register">
                <p>You do not have an account?</p>
                <button onClick={setIsAccount} className="register-btn">
                    Register
                </button>
            </div>
        </div>
    );
}
