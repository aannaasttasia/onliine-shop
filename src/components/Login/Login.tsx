import React, { useEffect, useState } from "react";
import "./css/Login.scss";
import { loginUser } from "@/api/serverRequests";
import Error from "./Error";

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
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        setButtonDisabled(!(email && password));
        setShowError(false)
    }, [email, password]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            if (!isButtonDisabled) {
                e.preventDefault();
                const token = await loginUser({
                    email,
                    password,
                });
                if (token) setToken(token.access_token);
                console.log("yes");
                localStorage.removeItem("cartProducts_null");
            }
        } catch (error) {
            setErrorMessage("Invalid email or password. Please try again.");
            setShowError(true);
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
                {showError && (
                    <div className="error-section">
                        <Error
                            errorMessage={errorMessage}
                            showMessage={showError}
                        />
                    </div>
                )}
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
