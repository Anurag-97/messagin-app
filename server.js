import express from 'express';
import mongoose from 'mongoose';
import messages from './whatsappdb.js'
import contactlist from './contactlist.js'
import Pusher from 'pusher'
import cors from 'cors'
import path from 'path'


const app=express();
const port=process.env.PORT || 5000

app.use(express.json())
app.use(cors())
const url='mongodb+srv://anurag:9432320541@cluster0.vewtc.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("Mongo connected"))

const pusher = new Pusher({
    appId: '1077688',
    key: 'ecdc21ad9bf56faa8024',
    secret: 'f920395fcf85cb589b25',
    cluster: 'ap2',
    encrypted: true
  });

const db=mongoose.connection;
db.once('open',()=>{
    console.log('DB openend')

    const messagecollection=db.collection('messages');
    const changeStream=messagecollection.watch();

    changeStream.on('change',(change)=>{
    if(change.operationType=='insert'){
        const messagedetails=change.fullDocument;
        pusher.trigger("messages","inserted",{
            sender:messagedetails.sender,
            message:messagedetails.message,
            timestamp:messagedetails.timestamp,
            receiver:messagedetails.receiver
        });
    }
    else{
        console.log('Error triggering Pusher')
    }
})
})
app.get('/',(req,res)=>res.status(200).send("Its working"));
app.get('/messages',(req,res)=>{
    console.log(req.query)
    //console.log(req.query.receiver)
    const send=req.query.sender;
    const rec=req.query.receiver;
    messages.find({$or : [{sender:send,receiver:rec},{receiver:send,sender:rec}]})
    .then(response=>{
        res.status(200).send(response)
    })
})

app.get('/contactlist',(req,res)=>{
    contactlist.find((err,data)=>{
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    })
})

app.post('/addcontact',(req,res)=>{
    //console.log(req.body);
    const valid=contactlist.findOne({ gmail: req.body.gmail });
    //console.log(valid)
    if(valid){
        //console.log("Already in there")
        return res.status(201).send("Already added");
    }
    //console.log("Now adding")
    const newuser=req.body;
    contactlist.create(newuser,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(`New user added ${data}`)
        }
    })
})
app.post('/add',(req,res)=>{
    const dbmessage=req.body;
    messages.create(dbmessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`New message created ${data}`)
        }
    })
})
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})