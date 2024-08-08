import { newUser } from "@/api/serverRequests";
import { useEffect, useState } from "react";
import "./css/Login.scss";

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
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        setButtonDisabled(!(email && password && name && surname && address && phoneNumber));
    }, [email, password, name, surname, address, phoneNumber]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await newUser({
            name,
            surname,
            address,
            phoneNumber,
            email,
            password,
        });
        setAccount(true);
    };

    return (
        <div className="register-wrapper">
            <h1>Please fill in the form</h1>
            <form onSubmit={handleSubmit} className="register-form">
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
            </form>
            <div>
                <button type="submit" className="register-submit" disabled={isButtonDisabled}>
                    Submit
                </button>
            </div>
            <div className="register-login">
                <p>I have an account</p>
                <button onClick={setIsAccount} className="login-btn">Sign in</button>
            </div>
        </div>
    );
}
