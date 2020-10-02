import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:String,
    gmail:String,
    status:String,
    photoURL:String
})

export default mongoose.model('contactlist',userSchema);