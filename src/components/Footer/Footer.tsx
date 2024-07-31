"use client";
import React, { useEffect, useRef, useState } from "react";
import "./css/Footer.scss";
import SupportPopup from "../SupportPopup/SupportPopup";

export default function Footer() {
    const [popupState, setPopupState] = useState<boolean>(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        setPopupState(false);
    };

    const handlePopupChangeState = () => {
        setPopupState(!popupState);
    };

    useEffect(() => {
        function handler(event: MouseEvent) {
            if (overlayRef.current && overlayRef.current === event.target) {
                console.log("clicked outside of modal");
                closeModal();
            }
        }
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    return (
        <footer className="footer">
            <strong className="about-me">&copy; By aannaasttasia</strong>
            <button
                className="footer__support"
                onClick={handlePopupChangeState}
            >
                Support
            </button>
            {popupState && (
                <div className="overlay" ref={overlayRef}>
                    <div className={ popupState ? "modal active" : "modal"}>
                        <SupportPopup />
                    </div>
                </div>
            )}
        </footer>
    );
}
