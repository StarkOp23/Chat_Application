import React from 'react'
import logo from './network-email-marketing-campaign-and-newsletter.gif'
import './myStyles.css'



const Welcome = () => {
    return (
        <div className='welcome-container'>
            <img src={logo} alt='logo' className='welcome-logo' />
            <p>Engage in direct conversations with people.</p>
        </div>
    )
}

export default Welcome
