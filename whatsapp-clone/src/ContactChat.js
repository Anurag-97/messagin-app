import React from 'react'
import {Avatar} from '@material-ui/core'
import './ContactChat.css'

function ContactChat({contactlist,id,onselect}) {
    function dothis(){
        onselect(contactlist)
    }
    return(
            <div onClick={dothis} className='contactinfo'>
                    <Avatar src={contactlist.photoURL} />
                    <div className='info'>
                        <h5>{contactlist.name}</h5>
                        <p>{contactlist.lastmessage}</p>
                    </div>
            </div>
        )
}

export default ContactChat
