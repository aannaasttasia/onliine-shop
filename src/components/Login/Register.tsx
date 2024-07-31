import { newUser } from "@/api/serverRequests";
import { url } from "@/api/url";
import axios from "axios";
import { useState } from "react";

export interface NewUserType {
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
}

interface RegisterProps{
    setAccount: (b: boolean)=>void,
    setIsAccount: () => void
}

export default function Register({setAccount, setIsAccount}: RegisterProps) {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPass] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await newUser({
            name,
            surname,
            address,
            phoneNumber,
            email,
            password
        })
        setAccount(true)
    };

    return (
        <div className="register-wrapper">
            <h1>Please fill in the form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Name</p>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Surname</p>
                    <input
                        type="text"
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </label>
                <label>
                    <p>Address</p>
                    <input
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    <p>Phone number</p>
                    <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
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
                        onChange={(e) => setPass(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <p>I have an account</p>
            <button onClick={setIsAccount}>Sign in</button>
        </div>
    );
}
