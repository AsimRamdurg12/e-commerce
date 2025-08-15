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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.signIn = exports.signUp = void 0;
const prisma_1 = require("../utils/prisma");
const AuthSchema_1 = require("../schema/AuthSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const data = AuthSchema_1.CreateUserSchema.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({
                message: data.error,
            });
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email: (_a = data.data) === null || _a === void 0 ? void 0 : _a.email,
            },
        });
        if (user) {
            res.status(401).json({
                success: false,
                message: "User already exists",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash((_b = data.data) === null || _b === void 0 ? void 0 : _b.password, 10);
        const newUser = yield prisma_1.prisma.user.create({
            data: {
                name: (_c = data.data) === null || _c === void 0 ? void 0 : _c.name,
                email: (_d = data.data) === null || _d === void 0 ? void 0 : _d.email,
                password: hashedPassword,
                role: (_e = data.data) === null || _e === void 0 ? void 0 : _e.role,
            },
        });
        res.status(201).json({
            success: true,
            message: newUser,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in signUp: ${error}`,
        });
        return;
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const data = AuthSchema_1.signInSchema.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({
                message: data.error,
            });
        }
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                email: (_a = data.data) === null || _a === void 0 ? void 0 : _a.email,
                role: (_b = data.data) === null || _b === void 0 ? void 0 : _b.role,
            },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const verifyPassword = yield bcrypt_1.default.compare((_c = data.data) === null || _c === void 0 ? void 0 : _c.password, user.password);
        if (!verifyPassword) {
            res.status(401).json({
                success: false,
                message: "Incorrect email or password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
        });
        res.status(200).json({
            success: true,
            message: token,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in signIn: ${error}`,
        });
        return;
    }
});
exports.signIn = signIn;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const findUser = yield prisma_1.prisma.user.findFirst({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
        });
        if (!findUser) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: findUser,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in getProfile: ${error}`,
        });
        return;
    }
});
exports.getProfile = getProfile;
