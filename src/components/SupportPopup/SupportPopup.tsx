import { useState } from "react";
import "./css/SupportPopup.scss";
import { newMessage } from "@/api/serverRequests";

export interface PopupPropsType{
    setPopupState: (state: boolean) => void
}

export default function SupportPopup({setPopupState}:PopupPropsType) {
    const [email, setEmail] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = JSON.stringify(sessionStorage.getItem("token"));
        await newMessage(
            {
                email,
                description,
            },
            token
        );
        setPopupState(false)
    };

    return (
        <form onSubmit={handleSend}>
            <div className="support-popup">
                Fill in the form
                <label htmlFor="">
                    <input
                        type="text"
                        className="support__email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="">
                    <textarea
                        className="support__description"
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button className="support__send-btn">Send</button>
            </div>
        </form>
    );
}
