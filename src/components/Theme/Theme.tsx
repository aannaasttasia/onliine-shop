import * as React from "react";
import { darkModeAtom } from "./themeState";
import { useAtom } from "jotai";
import { useEffect } from "react";
import "./css/Theme.scss";

export default function DarkMode() {
    const [mode, setDarkMode] = useAtom(darkModeAtom);

    useEffect(() => {
        const body = document.body;

        if (mode) {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
        } else {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
        }
    }, [mode]);

    return (
        <button
            onClick={() => {
                setDarkMode(!mode);
                console.log(mode);
            }}
            className="modeBtn"
        >
            {mode ? "light" : "dark"}
        </button>
    );
}
