import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core'
import {auth,provider} from './firebase'

function Login({onsignin}) {
    const signin=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            onsignin(result.user);
        })
        .catch(error=>alert(error.message));
    }
    return (
        <div className="login">
            <h1>If you got this link, you are special to me , a lot more than you think</h1>
            <h2>This is just a noob attempt to build something right from scratch.</h2>
            <h3>A messaging web app , Would love to hear your feedback</h3>
            <h4>Just message the contact that says Anurag...</h4>
            <h5>Enough talking lets get you in .</h5>
            <Button onClick={signin}>Sign in with google</Button>
        </div>
    )
}

export default Login
