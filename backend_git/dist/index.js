"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const signup_1 = __importDefault(require("./controllers/signup"));
const signin_1 = require("./controllers/signin");
const auth_1 = require("./middlewares/auth");
const addContent_1 = require("./controllers/addContent");
const getContent_1 = require("./controllers/getContent");
const deleteContent_1 = require("./controllers/deleteContent");
const updateContent_1 = require("./controllers/updateContent");
const getContentById_1 = require("./controllers/getContentById");
mongoose_1.default.connect(config_1.connectionDB);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use(express_1.default.json());
//api routes
app.post("/api/v1/signup", signup_1.default);
app.post("/api/v1/signin", signin_1.signin);
//@ts-ignore
app.post("/api/v1/content", auth_1.auth, addContent_1.addContent);
//@ts-ignore
app.get("/api/v1/content/:type", auth_1.auth, getContent_1.getContent);
//@ts-ignore
app.get("/api/v1/content/id/:contentId", auth_1.auth, getContentById_1.getContentById);
//@ts-ignore
app.get("/api/v1/content", auth_1.auth, getContent_1.getContent);
//@ts-ignore
app.put("/api/v1/content/:contentId", auth_1.auth, updateContent_1.updateContent);
//@ts-ignore
app.delete("/api/v1/content/:contentId", auth_1.auth, deleteContent_1.deleteContent);
app.listen(8000, () => {
    console.log("Server is running");
});
exports.default = app;
