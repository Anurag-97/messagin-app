import { Avatar, IconButton } from '@material-ui/core'
import React,{useState} from 'react'
import './Chatbox.css'
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';
import ScrollToBottom from 'react-scroll-to-bottom'

function Chatbox({chathistory,user,partner}) {
    const isreceive=(msg)=>{
        if(msg.sender===user.gmail)
            return true;
        else
            return false;
    }
    const [input,setinput]=useState("")
    //const id=usepara
    async function dothis(e){
        e.preventDefault();
        await axios.post('/add',{
            sender:user.gmail,
	        message:input,
            receiver:partner.gmail,
            timestamp:new Date()
        })
        setinput('');
    }
    function dateform(datestr){
        const date=new Date(datestr);
        const hr=date.getHours();
        const min=date.getMinutes();
        const sec=date.getSeconds();
        return <span className="time">{hr}:{min}:{sec}</span>
    }
    return (
        <div className='chatbox'>
            {partner?
            <div>
            <div className='header'>
            <div className='left'>
                <Avatar src={partner.photoURL}/>
                <div className='info'>
                    <h1>{partner.name}</h1>
                    <p>{partner.status}</p>
                </div>
            </div>
            <div className='icons'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>  
            </div>
        </div>
        <ScrollToBottom className='Chatsection'>
        {chathistory.map((msg)=>{
            return <p className={`message ${isreceive(msg) && "received"}`}>
            {msg.message}
            {dateform(msg.timestamp)}
        </p>
        })}
        </ScrollToBottom>
        <div className='searchbottom'>
            <IconButton>
            <SentimentVerySatisfiedIcon />
            </IconButton>
            <IconButton>
            <AttachFileIcon />
            </IconButton>
            <form onSubmit={dothis}>
                <input value={input} onChange={e=>setinput(e.target.value)} type='text' placeholder="Type Message" />
            </form>
            <IconButton>
            <MicIcon />
            </IconButton>
        </div>
        </div>
            :
            <div className="notselected">Select a contact to initiate the conversation !!</div>
            }
        </div>
        )
}

export default Chatbox
