import mongoose from 'mongoose'

const messageschema=mongoose.Schema({
    sender:String,
    receiver:String,
    timestamp:Date,
    message:String,
})

export default mongoose.model('messages',messageschema);