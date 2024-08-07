import React, { useEffect, useState } from 'react';
import logo from './network-email-marketing-campaign-and-newsletter.gif';
import './myStyles.css';
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const lightTheme = useSelector((state) => state.themeKey);
    const nav = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        console.log("Stored User Data:", storedUserData);
        if (!storedUserData) {
            console.log("User not Authenticated");
            nav("/");
        } else {
            setUserData(storedUserData);
        }
    }, [nav]);

    return (
        <div className={`welcome-container${lightTheme ? "" : " dark"}`}>
            <motion.img
                drag
                whileTap={{ scale: 1.05, rotate: 360 }}
                src={logo}
                alt="Logo"
                className="welcome-logo"
            />
            {userData && (
                <>
                    <b>Hi There! {userData.data.name} 👋 , Hope you are doing great!</b>
                    <p className='welcomeMsg'>View and text directly to people present in the chat Rooms.</p>
                </>
            )}
        </div>
    );
}

export default Welcome;
