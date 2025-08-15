"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Please enter your name").max(100),
    email: zod_1.z.string().email("Please enter valid email"),
    password: zod_1.z
        .string()
        .min(8)
        .max(100)
        .refine((password) => /[A-Z]/.test(password), "Password must contain one uppercase letter")
        .refine((password) => /[a-z]/.test(password), "Password must contain one smallcase letter")
        .refine((password) => /[0-9]/.test(password), "Password must contain one numerical character")
        .refine((password) => /[!@#$%^&*]/.test(password), "Password must contain one special character"),
    role: zod_1.z.enum(["user", "admin"], {
        message: "Please select role",
    }),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(["user", "admin"]),
});
