"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "You are not logged in"
        });
    }
    jsonwebtoken_1.default.verify(token, config_1.jwt_secret, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token"
            });
        }
        // @ts-ignore
        req.user = user;
        next();
    });
};
exports.auth = auth;
