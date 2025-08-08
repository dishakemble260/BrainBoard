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
exports.addContent = void 0;
const content_1 = require("../models/content");
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user.response._id;
    const { type, link, title, tags } = req.body;
    if (!userId) {
        return res.status(403).json({ message: "Unauthenticated content added" });
    }
    try {
        yield content_1.ContentModel.create({
            type,
            title,
            link,
            tags,
            userId: userId
        });
        res.status(200).json({
            message: "Content added successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Something went wrong, add content again"
        });
    }
});
exports.addContent = addContent;
