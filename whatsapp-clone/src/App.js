import React,{useEffect,useState} from 'react';
import './App.css';
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'
import Pusher from 'pusher-js'
import axios from './axios'
import Login from './Login'

function App() {
  const [user,setuser]= useState(null);
  const [chathistory,setchathistory]= useState([]);
  const [contactlist,setcontactlist]= useState([]);
  const [partner,setpartner]= useState(null);

  const onsignin=(userin)=>{
    const current={
      name:userin.displayName,
      gmail:userin.email,
      status:"online",
      photoURL:userin.photoURL
    }
    setuser(current);
    axios.post('/addcontact',current);

    axios.get('/contactlist')
    .then((response)=>{
      const arr=response.data;
      const finarr=[];
      for(let i=0;i<arr.length;i++){
        if(arr[i].gmail!==current.gmail)finarr.push(arr[i]);
      }
      setcontactlist(finarr)
    })
  }
  useEffect(() => {
    const pusher = new Pusher('ecdc21ad9bf56faa8024', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=> {
      setchathistory([...chathistory,data])
      });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chathistory]);
  
  function onselect(part){
    setpartner(part);
    const request={
      params:{
        sender : user.gmail,
        receiver : part.gmail
      }
    }
    console.log(request)
    axios.get('/messages',request)
    .then((response)=>{
      console.log(response)
      setchathistory(response.data)
    })  
  }
    return(
    <div className='App'>
      {!user? 
        <Login onsignin={onsignin}/>
      : 
      <div className='app_body'>
      
      <Sidebar partner={partner} onselect={onselect} user={user} contactlist={contactlist} key={contactlist}/>
      <Chatbox user={user} partner={partner} chathistory={chathistory} key={user}/>
      </div>}
    </div>
  );
}

export default App;
