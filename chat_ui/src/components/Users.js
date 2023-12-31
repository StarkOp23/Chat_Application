import React from 'react'
import './myStyles.css'
import { IconButton } from '@mui/material'
import logo from './message-chat-1.svg'
import SearchIcon from '@mui/icons-material/Search';



const Users = () => {
    return (
        <div className='list-container'>
            <div className='ug-header'>
                <img src={logo} alt='logo' style={{ height: "2rem", width: "2rem", marginLeft: "5px" }} />
                <p className='ug-title'>Online Users</p>
            </div>
            <div className='sb-search'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input placeholder='search' className='search-box' />
            </div>
            <div className='ug-list'>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
                <div className='list-item'>
                    <p className='con-icon'>T</p>
                    <p className='con-title'>Test User</p>
                </div>
            </div>
        </div>
    )
}

export default Users
