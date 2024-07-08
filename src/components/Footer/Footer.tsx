"use client";
import React, { Component, useState } from "react";
import "./css/Footer.scss";
import SupportPopup from "../SupportPopup/SupportPopup";

export default function Footer() {
    const [popupState, setPopupState] = useState<boolean>(false);

    const handlePopupChangeState = () =>{
      setPopupState(!popupState)
    };

    return (
        <footer className="footer">
            <strong className="about-me">&copy; By aannaasttasia</strong>
            <button className="footer__support" onClick={handlePopupChangeState}>Support</button>
            {popupState && (
                <div className="overlay">
                    <div className="modal">
                        <button className="close" onClick={handlePopupChangeState}>
                            Close
                        </button>
                        <SupportPopup />
                    </div>
                </div>
            )}
        </footer>
    );
}
