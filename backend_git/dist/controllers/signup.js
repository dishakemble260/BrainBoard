"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username) {
        return res
            .status(411)
            .json({
            "message": "Username is required."
        });
    }
    if (!password) {
        return res
            .status(411)
            .json({
            message: "Password is required."
        });
    }
    const usernameExists = yield user_1.UserModel.findOne({ username: username });
    if (usernameExists) {
        return res.status(403).json({ message: "Username already exists" });
    }
    yield user_1.UserModel.create({
        username: username,
        password: password
    });
    res.status(200).json({ message: "User signed up successfully" });
});
exports.default = Signup;
