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
exports.getContentById = void 0;
const content_1 = require("../models/content");
const getContentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    if (!contentId) {
        return res.status(400).json({ message: "Content ID is required" });
    }
    try {
        const contentData = yield content_1.ContentModel.findById(contentId);
        if (!contentData) {
            return res.status(404).json({ message: "Content not found" });
        }
        return res.status(200).json(contentData); // returns flat object
    }
    catch (error) {
        console.error("Error fetching content:", error);
        return res.status(500).json({ message: "Failed to fetch content" });
    }
});
exports.getContentById = getContentById;
