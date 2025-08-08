import {Schema,Model} from "mongoose";
import mongoose from "mongoose";

const contentSchema = new Schema({
    type : String,
    link : String,
    title : String,
    tags : {type: Array, ref: 'tags'},
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'user'}

});

const ContentModel = mongoose.model('content',contentSchema);

export {ContentModel};