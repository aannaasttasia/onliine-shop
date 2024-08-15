import { newUser } from "@/api/serverRequests";
import { useEffect, useState } from "react";
import "./css/Login.scss";
import Error from "./Error";
import axios from "axios";

export interface NewUserType {
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
}

interface RegisterProps {
    setAccount: (b: boolean) => void;
    setIsAccount: () => void;
}

export default function Register({ setAccount, setIsAccount }: RegisterProps) {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPass] = useState<string>("");
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        setButtonDisabled(
            !(email && password && name && surname && address && phoneNumber)
        );
        setShowError(false);
    }, [email, password, name, surname, address, phoneNumber]);

    const handleSubmit = async () => {
        try {
            await newUser({
                name,
                surname,
                address,
                phoneNumber,
                email,
                password,
            });
            console.log("done", email, password);
            setAccount(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 409) {
                        setErrorMessage(
                            "An account with this email address already exists."
                        );
                    }
                    if (error.response.status === 400) {
                        setErrorMessage("Check the format of your data.");
                    }
                }
            } else{
                setErrorMessage("Credentials are incorrect. Please try again.");
            }
            setShowError(true);
        }
    };

    return (
        <div className="register-wrapper">
            <h1>Please fill in the form</h1>
            <form className="register-form">
                <div className="register-form-group">
                    <input
                        className="register-form-input"
                        type="text"
                        placeholder=" "
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="label">Name</label>
                </div>
                <div className="register-form-group">
                    <input
                        className="register-form-input"
                        type="text"
                        placeholder=" "
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <label className="label">Surname</label>
                </div>
                <div className="register-form-group">
                    <input
                        className="register-form-input"
                        type="text"
                        placeholder=" "
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className="label">Address</label>
                </div>
                <div className="register-form-group">
                    <input
                        className="register-form-input"
                        type="text"
                        placeholder=" "
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label className="label">Phone number</label>
                </div>
                <div className="register-form-group">
                    <input
                        className="register-form-input"
                        type="text"
                        placeholder=" "
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="label">Email</label>
                </div>
                <div className="register-form-group">
                    <input
                        className="register-form-input"
                        type="password"
                        placeholder=" "
                        onChange={(e) => setPass(e.target.value)}
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
                <div></div>
            </form>
            <button
                type="submit"
                className="register-submit"
                disabled={isButtonDisabled}
                onClick={handleSubmit}
            >
                Submit
            </button>
            <div className="register-login">
                <p>I have an account</p>
                <button onClick={setIsAccount} className="login-btn">
                    Sign in
                </button>
            </div>
        </div>
    );
}
