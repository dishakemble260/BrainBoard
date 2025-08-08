"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const User = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
});
const UserModel = mongoose_1.default.model('user', User);
exports.UserModel = UserModel;
