"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = express_1.default.Router();
router.post("/sign-up", AuthController_1.signUp);
router.post("/sign-in", AuthController_1.signIn);
router.get("/get-user", AuthMiddleware_1.authenticate, AuthController_1.getProfile);
exports.default = router;
