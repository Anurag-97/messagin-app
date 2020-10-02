import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar,IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ContactChat from './ContactChat';

export default function Sidebar({partner,onselect,user,contactlist}) {
    return (
        <div className='sidebar'>
            <div className='header'>
                <div className='lefthead'>
                    <Avatar src={user.photoURL}/>
                </div>
                <div className='iconhead'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>  
                </div>
            </div>
                <div className='Search'>
                    <SearchIcon />
                    <input type='text' placeholder="Search or start a new chat" />
                </div>
                <div className='chats'>
                    {
                        //console.log(contactlist)
                        contactlist.map((contactlist)=>{
                            return <ContactChat onselect={onselect} contactlist={contactlist} id={contactlist} key={contactlist.gmail}/>
                        })
                    }
                </div>
            </div>
    )
}
