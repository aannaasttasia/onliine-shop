import * as React from "react";
import { darkModeAtom } from "./themeState";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import "./css/Theme.scss";

export default function Theme() {
    const [mode, setDarkMode] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {  
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme !== null) {
                setDarkMode(JSON.parse(savedTheme));
            }
        }
    }, []);

    useEffect(() => {
        const body = document.body;
        if (!mode) {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
        } else {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
        }

        if (typeof window !== 'undefined') {  
            localStorage.setItem('theme', JSON.stringify(mode));
        }
    }, [mode]);

    const handleChangeTheme = () => {
        setDarkMode(prevMode => !prevMode);
    }

    return (
        <label className="theme">
            <span className="theme__toggle-wrap">
                <input
                    id="theme"
                    className="theme__toggle"
                    type="checkbox"
                    role="switch"
                    name="theme"
                    value="dark"
                    checked={!mode}
                    onChange={() => {
                        handleChangeTheme();
                    }}
                />
                <span className="theme__icon">
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                </span>
            </span>
        </label>
    );
}
