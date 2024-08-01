import React, { createContext, useState } from 'react'
import './myStyles.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
// import { Create } from '@material-ui/icons'
import CreateIcon from '@mui/icons-material/Create';
import CreateGroups from './CreateGroups'
import Users from './Users'
import { Outlet } from 'react-router-dom'
import Groups from './Groups'
// import WorkArea from './WorkArea'

export const myContext = createContext();

const MainContainer = () => {


    return (
        <div className='main-container'>
            <Sidebar />
            <Outlet />

            {/* <Welcome /> */}
            {/* <CreateGroups /> */}
            {/* <ChatArea props={conversations[0]} /> */}
            {/* <Users /> */}
            {/* <Groups /> */}
        </div>
    )
}

export default MainContainer
