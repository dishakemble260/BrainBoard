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
exports.updateContent = void 0;
const content_1 = require("../models/content");
const updateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    const data = req.body;
    if (!contentId) {
        return res.status(404).json({ message: "Content ID not provided" });
    }
    try {
        const updatedData = yield content_1.ContentModel.findByIdAndUpdate(contentId, data, { new: true });
        if (!exports.updateContent) {
            return res.status(404).json({ message: "Content not found" });
        }
        return res.status(200).json({
            message: "Content updated successfully",
            data: updatedData
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, try again later" });
    }
});
exports.updateContent = updateContent;
