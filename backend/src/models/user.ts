import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    username : {type:String, unique: true},
    password : {type:String}
});

const UserModel = mongoose.model('user',User);

export {UserModel};