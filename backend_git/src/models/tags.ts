import mongoose from "mongoose";
import { Schema } from "mongoose";

const TagsSchema = new Schema({
    tagName : {type: String}
});

const tagsModel = mongoose.model('tags',TagsSchema);

export {tagsModel} ;