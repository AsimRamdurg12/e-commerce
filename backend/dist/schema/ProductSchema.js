"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ProductSchema = zod_1.default.object({
    title: zod_1.default
        .string()
        .min(3, "Title is not valid")
        .max(100, "Title exceeds character limit"),
    description: zod_1.default
        .string()
        .min(50, "Enter minimum 50 characters")
        .max(300, "description exceeds limit"),
    category: zod_1.default.string(),
    price: zod_1.default.number(),
    image: zod_1.default.string(),
});
