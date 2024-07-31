import React, { useState } from 'react'
import './myStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';
import ConversationsItem from './ConversationsItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';


const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.themeKey);

    const [conversations, setConversations] = useState([
        {
            name: 'NAME#1',
            lastMessage: 'Last Message #1',
            timeStamp: 'today'
        },
        {
            name: 'NAME#2',
            lastMessage: 'Last Message #2',
            timeStamp: 'today'
        },
        {
            name: 'NAME#3',
            lastMessage: 'Last Message #3',
            timeStamp: 'today'
        }
    ])


    return (
        <div className='sidebar-container'>
            <div className={'sb-header' + ((lightTheme) ? "" : " dark ")}>
                <div className="other-icons">

                    <IconButton>
                        <AccountCircleIcon className={'icon' + ((lightTheme) ? "" : " dark ")} />
                    </IconButton>

                </div>

                <div>
                    <IconButton onClick={() => { navigate('user') }}>
                        <PersonAddIcon className={'icon' + ((lightTheme) ? "" : " dark ")} />
                    </IconButton>

                    <IconButton onClick={() => { navigate('groups') }}>
                        <GroupAddIcon className={'icon' + ((lightTheme) ? "" : " dark ")} />
                    </IconButton>

                    <IconButton onClick={() => { navigate('create_groups') }}>
                        <AddCircleIcon className={'icon' + ((lightTheme) ? "" : " dark ")} />
                    </IconButton>

                    <IconButton onClick={() => {
                        dispatch(toggleTheme());
                    }}>
                        {lightTheme && <NightlightIcon className={'icon' + ((lightTheme) ? "" : " dark ")} />}
                        {!lightTheme && <LightModeIcon className={'icon' + ((lightTheme) ? "" : " dark ")} />}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            localStorage.removeItem("userData");
                            navigate("/");
                        }}
                    >
                        <ExitToAppIcon className={"icon" + (lightTheme ? "" : " dark")} />
                    </IconButton>
                </div>

            </div>

            <div className={'sb-search' + ((lightTheme) ? "" : " dark ")}>
                <IconButton>
                    <SearchIcon className={'icon' + ((lightTheme) ? "" : " dark ")} />
                    <input placeholder='search' className={'search-box' + ((lightTheme) ? "" : " dark ")} />
                </IconButton>
            </div>

            <div className={'sb-conversations' + ((lightTheme) ? "" : " dark ")} >
                {
                    conversations.map((conversation) => {
                        return <ConversationsItem props={conversation} key={conversation.name} />
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar
