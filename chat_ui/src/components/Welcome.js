import React from 'react'
import logo from './message-chat-1.svg'
import './myStyles.css'



const Welcome = () => {
    return (
        <div className='welcome-container'>
            <img src={logo} alt='logo' className='welcome-logo' />
            <p>Welcome to the Chat App . Chat Directly with the people in Chat Room</p>
        </div>
    )
}

export default Welcome
