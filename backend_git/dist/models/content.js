"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.Schema({
    type: String,
    link: String,
    title: String,
    tags: { type: Array, ref: 'tags' },
    userId: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'user' }
});
const ContentModel = mongoose_2.default.model('content', contentSchema);
exports.ContentModel = ContentModel;
