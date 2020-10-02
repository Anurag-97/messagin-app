import React,{useState,useEffect} from 'react'
import './Contactindi.css'

function Contactindi() {
    const [name,setname]=useState("");
    const [lastmessage,setlastmessage]=useState("");
    return (
        <div className='info'>
            <h5>{name}</h5>
            <p>{lastmessage}</p>       
        </div>
    )
}

export default Contactindi
