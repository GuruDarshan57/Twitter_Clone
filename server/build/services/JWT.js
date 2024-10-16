"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTservice {
    static createToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
        };
        const secret = "guru@123";
        const token = jsonwebtoken_1.default.sign(payload, secret);
        return token;
    }
}
exports.default = JWTservice;
