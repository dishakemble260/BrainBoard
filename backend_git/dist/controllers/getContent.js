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
exports.getContent = void 0;
const content_1 = require("../models/content");
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user.response._id;
    const { type } = req.params;
    if (!userId) {
        return res.status(401).json({ message: "Invalid user" });
    }
    try {
        if (!type) {
            const response = yield content_1.ContentModel.find({ userId: userId });
            return res.status(200).json({ response });
        }
        else {
            const response = yield content_1.ContentModel.find({ userId: userId, type: type });
            return res.status(200).json({ response });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch content" });
    }
});
exports.getContent = getContent;
