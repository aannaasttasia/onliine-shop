import * as React from "react";
import { darkModeAtom } from "./themeState";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import "./css/Theme.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Theme() {
    const [mode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const body = document.body;
        if (typeof window !== 'undefined') {  
            const darkTheme = localStorage.getItem('theme');
            if (darkTheme !== null) {
                setDarkMode(JSON.parse(darkTheme));
            }
        }
    }, []);

    useEffect(() => {
        const body = document.body;
        const icon = document.querySelector('.btn__icon')
        icon?.classList.add('animated')
        if (mode) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
        }
        if (typeof window !== 'undefined') {  
            localStorage.setItem('theme', JSON.stringify(mode));
        }
        
        setTimeout(()=>{
            icon?.classList.remove('animated')
        }, 500)

    }, [mode]);

    const handleChangeTheme = () => {
        setDarkMode(prevMode => !prevMode);
    }

    return (
        <div className="btn" onClick={handleChangeTheme}>
            <div className="btn-indicator">
                <div className="btn__icon-container">
                    <i className={!mode ? "btn__icon fa-solid fa-sun" : "btn__icon fa-solid fa-moon" }></i>
                </div>
            </div>
        </div>
    );
}
